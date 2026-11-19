import UIKit
import GameKit
import Capacitor

/// Game Center for the web game, called from index.html as `Capacitor.Plugins.GameCenter`.
///   signIn()                         -> { authenticated }   (asks iOS to sign the player in, once per launch)
///   submitScore({ leaderboardId, score })
///   showLeaderboard({ leaderboardId }) opens Apple's leaderboard screen
/// Leaderboard IDs live in index.html (LEADERBOARDS), one per play style, and must match App Store Connect.
@objc(GameCenterPlugin)
public class GameCenterPlugin: CAPPlugin, CAPBridgedPlugin, GKGameCenterControllerDelegate {
    public let identifier = "GameCenterPlugin"
    public let jsName = "GameCenter"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "signIn", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitScore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showLeaderboard", returnType: CAPPluginReturnPromise)
    ]

    private var handlerSet = false
    private var signInCalls: [CAPPluginCall] = []

    @objc func signIn(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let player = GKLocalPlayer.local
            if player.isAuthenticated {
                call.resolve(["authenticated": true])
                return
            }
            self.signInCalls.append(call)
            // iOS calls this handler once now and again whenever the sign-in state changes.
            // It may be set only once; setting it is what starts the sign-in.
            guard !self.handlerSet else { return }
            self.handlerSet = true
            player.authenticateHandler = { [weak self] viewController, _ in
                guard let self = self else { return }
                if let viewController = viewController {
                    // Player isn't signed in on this device: show Apple's sign-in sheet.
                    self.bridge?.viewController?.present(viewController, animated: true)
                    return
                }
                let calls = self.signInCalls
                self.signInCalls = []
                for c in calls { c.resolve(["authenticated": GKLocalPlayer.local.isAuthenticated]) }
            }
        }
    }

    @objc func submitScore(_ call: CAPPluginCall) {
        guard let leaderboardId = call.getString("leaderboardId"), let score = call.getInt("score") else {
            call.reject("leaderboardId and score are required")
            return
        }
        guard GKLocalPlayer.local.isAuthenticated else {
            call.reject("Not signed in to Game Center")
            return
        }
        GKLeaderboard.submitScore(score, context: 0, player: GKLocalPlayer.local, leaderboardIDs: [leaderboardId]) { error in
            if let error = error { call.reject(error.localizedDescription) } else { call.resolve() }
        }
    }

    @objc func showLeaderboard(_ call: CAPPluginCall) {
        guard let leaderboardId = call.getString("leaderboardId") else {
            call.reject("leaderboardId is required")
            return
        }
        DispatchQueue.main.async {
            guard GKLocalPlayer.local.isAuthenticated else {
                call.reject("Not signed in to Game Center")
                return
            }
            let vc = GKGameCenterViewController(leaderboardID: leaderboardId, playerScope: .global, timeScope: .allTime)
            vc.gameCenterDelegate = self
            self.bridge?.viewController?.present(vc, animated: true)
            call.resolve()
        }
    }

    public func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        gameCenterViewController.dismiss(animated: true)
    }
}

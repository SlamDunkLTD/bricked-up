import UIKit
import Capacitor

/// The app's web view. Registers plugins that live in this Xcode project rather than in npm packages.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(GameCenterPlugin())
    }
}

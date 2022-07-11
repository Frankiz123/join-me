<!----------------------- for setup ---------------------->

## clone the repo from github link
## yarn install
## cd ios && pod install
## react-native run-ios

<!----------------------- if app crashes after splash ---------------------->
## go to
## node_modules -> react-native-permission --> RNPermissions.m
## in this file Search for "No permission handler detected"
## and comment this line "RCTLogError(@"%@", message)"


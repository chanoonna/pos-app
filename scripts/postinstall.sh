read -r -d '' PARSE << EOF

var app = Application.currentApplication();
app.includeStandardAdditions = true;

function run() {
    const parsed = JSON.parse(app.read("./package.json"));
    return parsed.devDependencies.electron;
}

EOF

_VERSION=$( osascript -l 'JavaScript' <<< "${PARSE}" )
VERSION=${_VERSION/[^\d+(\.\d+)*$]/}

echo "Electron verion found: ${VERSION}"
echo ""

echo "Installing sqlite3 with target electron version ${VERSION}..."
npm install sqlite3 --build-from-source --runtime=electron --target=$VERSION --dist-url=https://electronjs.org/headers
echo ""

echo "Rebuilding with sqlite3..."
node ./node_modules/.bin/electron-rebuild -f -w sqlite3
echo ""

echo "Installing app dependencies..."
node ./node_modules/.bin/electron-builder install-app-deps
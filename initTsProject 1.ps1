Param(
    [switch]$html,
    [switch]$ts,
    [switch]$git
)

$all = -not($html -or $ts -or $git)

if($html -or $all){
    if(-not(Test-Path .\index.html)){
New-Item -Path . -Name "index.html" -ItemType "file" -Value @"
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <script src="main.js"></script>
</body>
</html>
"@}
    if(-not(Test-Path .\style.css)){
    New-Item -Path . -Name "style.css" -ItemType "file" -Value '@charset "utf-8";'
    }
    if(-not(Test-Path .\main.ts)){
    New-Item -Path . -Name "main.ts" -ItemType "file"
    }
}

if($ts -or $all){
    if(-not(Test-Path .\package.json)){
    npm init -y
    }
    if(-not(Test-Path .\package-lock.json)){
    npm install -D @types/node typescript
    }
    if(-not(Test-Path .\tscongif.json)){
    npx tsc --init
    }
}

if($git -or $all){
    if(-not(Test-Path .\.gitignore)){
    New-Item -Path . -Name ".gitignore" -ItemType "file" -Value @"
node_modules/
.node_modules/
built/*
tests/cases/rwc/*
tests/cases/perf/*
!tests/cases/webharness/compilerToString.js
test-args.txt
~*.docx
\#*\#
.\#*
tests/baselines/local/*
tests/baselines/local.old/*
tests/services/baselines/local/*
tests/baselines/prototyping/local/*
tests/baselines/rwc/*
tests/baselines/reference/projectOutput/*
tests/baselines/local/projectOutput/*
tests/baselines/reference/testresults.tap
tests/baselines/symlinks/*
tests/services/baselines/prototyping/local/*
tests/services/browser/typescriptServices.js
src/harness/*.js
src/compiler/diagnosticInformationMap.generated.ts
src/compiler/diagnosticMessages.generated.json
src/parser/diagnosticInformationMap.generated.ts
src/parser/diagnosticMessages.generated.json
rwc-report.html
*.swp
build.json
*.actual
tests/webTestServer.js
tests/webTestServer.js.map
tests/webhost/*.d.ts
tests/webhost/webtsc.js
tests/cases/**/*.js
tests/cases/**/*.js.map
*.config
scripts/eslint/built/
scripts/debug.bat
scripts/run.bat
scripts/**/*.js
scripts/**/*.js.map
coverage/
internal/
**/.DS_Store
.settings
**/.vs
**/.vscode/*
!**/.vscode/tasks.json
!**/.vscode/settings.template.json
!**/.vscode/launch.template.json
!**/.vscode/extensions.json
!tests/cases/projects/projectOption/**/node_modules
!tests/cases/projects/NodeModulesSearch/**/*
!tests/baselines/reference/project/nodeModules*/**/*
.idea
yarn.lock
yarn-error.log
.parallelperf.*
tests/baselines/reference/dt
.failed-tests
TEST-results.xml
package-lock.json
.eslintcache
*v8.log
/lib/
initTsProject.ps1
"@
}
git init
}


@echo off
setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MAVEN_PROJECTDIR=%~dp0."
if not defined MAVEN_USER_HOME set "MAVEN_USER_HOME=%MAVEN_PROJECTBASEDIR%.maven-cache"
if not defined MAVEN_REPO_LOCAL set "MAVEN_REPO_LOCAL=%MAVEN_PROJECTBASEDIR%.m2\repository"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar"
if not exist "%WRAPPER_JAR%" (
  echo Maven wrapper JAR is missing: %WRAPPER_JAR%
  echo Run the setup instructions in README.md to download it.
  exit /b 1
)
set "JAVA_EXE=java"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
"%JAVA_EXE%" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTDIR%" "-Dmaven.repo.local=%MAVEN_REPO_LOCAL%" -classpath "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal

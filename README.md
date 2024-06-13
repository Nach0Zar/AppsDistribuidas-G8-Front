# MoviePlay
MoviePlay es una app mobile donde los usuarios pueden visualizar y recomendar películas.

## COMO CORRER EL PROGRAMA EN REACT NATIVE 
Hay dos formas de crear un proyecto en React Native: CLI y EXPO. Nosotros utilizamos CLI.

## Configuracion del entorno (windows)
  Fuente: https://reactnative.dev/docs/set-up-your-environment

### Instalar Chocolatey
  1. Abrir el CMD como administrador.
  2. Pegar este comando:
    
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072;     iex ((New-Object         System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

### Instalar Nodejs-LTS y Java SE Development Kit (JDK17)
  Correr el siguiente comando en CMD como admin:
  `choco install -y nodejs-lts openjdk17`

### Instalar Android Studio
  1. Ir a https://developer.android.com/studio
  2. Durante el proceso de instalacion, asegurarse que las siguientes opciones esten chequeadas:
    -Android SDK
    -Android SDK Platform
    -Android Virtual Device
    -Si todavia no esta usando Hyper-V: Performance (Intel ® HAXM)
  3. En el inicio de Android Studio, clickear en "more actions" -> SDK Manager -> Show Package Details -> Android 14 (UpsideDownCake) -> **Android SDK Platform 34** **Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image**.
  4. Luego ir a la tab SDK Tools -> Show Package Details -> Asegurarse que este selecciado: **34.0.0**
  5. Click en "Apply" -> tienen que aparecer los 3 componentes -> OK.

### Configurar variables de entorno
  1. Abrir el panel de control de Windows.
  2. En el buscador de Windows poner "variables de entorno".
  3. Click en "Variables de entorno..."
  4. En "Variables de usuario" click en "Nuevo"
  5. Nombre: `ANDROID_HOME`
  6. Valor: `C:\Users\TU USUARIO DE WINDOWS\AppData\Local\Android\Sdk`
  7. "Aceptar"
  8. Click en "Nuevo" otra vez
  9. Nombre: `JAVA_HOME`
  10. Valor: `C:\Program Files\Java\jdk-17`
  11. Ahora en "Variable de sistema" ir a "Nuevo" y pegar otra vez `JAVA_HOME` y `C:\Program Files\Java\jdk-17`
  12. En "Variables de sistema" buscar "Path" -> "Editar" -> "Nuevo" -> pegar `C:\Users\TU USUARIO DE WINDOWS\AppData\Local\Android\Sdk\platform-tools`

### Preparar un emulador de Android para correr la aplicacion
  1. Abrir Android Studio
  2. "more actions" -> "Virtual Device Manager"
  3. Seleccionar "Create Device"
  4. Seleccionar un "Phone" de la lista y click en "Next", luego seleccionar "UpsideDownCake API Level 34" image.
  5. Puedes crear mas de un device con resolucion diferente para testear la aplicacion.

## Correr el proyecto
  1. Clonar el repositorio con el siguiente comando `git clone https://github.com/Nach0Zar/AppsDistribuidas-G8-Front.git`
  2. Abrimos el proyecto con Visual Studio Code
  3. Asegurarse de tener el emulador de Android corriendo desde Android Studio.
  4. En la terminal de Visual Studio Code instalar las dependencias: `npm install --force`
  5. Luego para correr la aplicacion, levantamos metro con el siguiente comando (se puede hacer desde la terminal de VSCode):
    `npm start`
  6. Presionar la tecla 'a' en la consola para iniciar el proyecto en el emulador de Android.

## Autores
- **Ignacio Zarlenga** - 1132325 - (https://www.github.com/Nach0Zar)
- **Matias Huber**     - 1104861 - (https://www.github.com/matihuber)
- **Manuel Marcos**    - 1129453 - (https://www.github.com/ManuMarcos)
- **Mateo Ferreyra**   - 1135300 - (https://www.github.com/ElCQ)
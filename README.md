### Installation

#### Linux

1. Install NodeJS. See the packages for [Ubuntu](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) and other distributions.
2. Download https://github.com/kristjanjansen/kuressaare_majad/archive/master.zip
3. Unpack and run

    ```sh
    npm install
    node convert
    ```

#### Windows

At the moment only 64-bit Windows is supported

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Install [Python 2.7](https://www.python.org/downloads/windows/)
3. Run in the shell:

    ```sh
    npm config set python C:\python27 # or whereever Python is installed
    ```

4. Download https://github.com/kristjanjansen/kuressaare_majad/archive/master.zip
5. Unpack and run in the shell:

    ```sh
    npm install
    node convert
    ```

You can now copy the ```/public``` folder to the web server and point the browser to it.

### Source code

https://github.com/kristjanjansen/kuressaare_majad

### Licence

[GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html)
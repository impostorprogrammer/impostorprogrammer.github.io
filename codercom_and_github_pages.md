[//]: # ( spellcheck-language en )

# GitHub Pages running in VS Code in Coder.com

Wouldn't it be awesome if you could just fire up your browser from any machine, do some edits to your github pages, then preview your changes in a browser from anywhere instantly.

This is exactly what I'm doing writing this article. Now I'll change to another browser/machine and continue...

Now I'm back, this time using Firefox from the same machine though, but hey, you get the point.

## **[Coder.Com](https://coder.com):** VS Code in the in the cloud via the browser - Remote Visual Studio Code IDE

If haven't heard it yet, the VS Code IDE is now available remotely via a browser, on **[Coder.Com](https://coder.com)**
Really cool actually, but that is not all. What you get is the actual VS Code interface in the browser, the 'backend' running in a linux container.
With the Terminal in VS Code you also have full access to that Linux container. 

As they nice people from Coder.com say "if you can install it and run it on the container you can use it" (do nothing 'bad' though, check their usage policy).

So, after signing up to Coder.com, and logging in, I got cranking...

1. Opened a bash terminal in VS Code
2. I cloned my GitHub repo for this site
3. I added a new page to the site (this page actually)
4. Then I asked myself, how can I preview my new page?
        a. I am  using one of the standard Jekyll templates fir gitub pages
        b. 


Had a look at [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll)

Then got it setup, essentially what you need is:

## Install Ruby:
        sudo apt-get install ruby-full

## Install Bundler:
        gem install bundler

## Install Jekyll using bundler (create the gemfile first if not present) etc, see the GitHub Pages instruction for details.


## Build and 'publish' you site using Jekyll

        bundle exec jekyll serve host=0.0.0.0

_Note the special host address, tells Jekyll site to listen any address_

You should now see something like this:

```
root@coder:/projects/impostorprogrammer.github.io# bundle exec jekyll serve --host=0.0.0.0
Configuration file: /projects/impostorprogrammer.github.io/_config.yml
            Source: /projects/impostorprogrammer.github.io
       Destination: /projects/impostorprogrammer.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
   GitHub Metadata: No GitHub API authentication could be found. Some fields may be missing or have incorrect data.
                    done in 0.676 seconds.
 Auto-regeneration: enabled for '/projects/impostorprogrammer.github.io'
    Server address: http://0.0.0.0:4000
  Server running... press ctrl-c to stop.
```

By default Jekyll will listen on port 4000, no problem just keep it in mind.

_Now, how can we connect or open a browser to this site or page?_

## Use a port remoting service like (Remot3.it)[https://remote.it]
You will need something that listens for http request on an internet accessible address, and passes or proxies those requests and responses for you to the internet connected client. The reason is that the coder.com container you are using is not per default (at least not what I could deduce) exposing a port you could use. So something need to locally on the container connect to your web server port, and expose a port on an internet accessible address. We can accomlish this by using a port or connection remoting service like r(Remot3.it)[https://remote.it].

(I used remote.it in this example, but I would expect it should work with others as well, they have a free tier for personal use)

### The essential steps are:
For details see the (Getting started page on remote.it)[https://docs.remote.it/getting-started]

1. Signup for a free Remote.it account
2. Download the interactive client installer to your Coder.com container
3. Run it and set it up for web and to use port 4000

#### What Remote.it installer to download?

There are a few options of installers to download, we need to choose the one that will work on the coder.com container.
So we need to know what Linux distro it is using, what CPU architecture, and if it is 64/32 bit.

I checked this out for you, the container is running an Ubuntu distro, on Intel in 64-bit mode. How you can check this, see details below.
So suffice to say I used, parts of, their AWS/Ubuntu instructions. As we already have a container with linux running, we are conneted to it and have a bash terminal running, we  can jump stright to  the download step.

(Download and install the connectd Debian package)[https://docs.remote.it/platforms/getting-started-with-remote.it-on-aws-ubuntu/download-and-install-the-connectd-debian-package]

Then follow their instructions for subsequent steps.

After all this you should be able to log on to remote.it and click on the new device you added as web, and it will open a new page in the browser (or give you an url) that you can now connect to your web server running in the coder.com container.

#### Checking linux distro and architecture in the container

The coder.com containers uses a Ubuntu based distro, you can check this with (works on this type of distro)

        root@coder:/projects# cat /proc/version
        Linux version 4.18.4-041804-generic (kernel@tangerine) (gcc version 8.2.0 (Ubuntu 8.2.0-4ubuntu1)) #201808220230 SMP Wed Aug 22 06:33:04 UTC 2018

Further what type of architecture

        root@coder:/projects# lscpu
        Architecture:          x86_64
        CPU op-mode(s):        32-bit, 64-bit

And to check if it is running 64-bit:

        root@coder:/projects# uname -m
        x86_64

## VSCode on ide.coder.com issues encountered

### Terminal windows 'dies' or disconnects
Terminal 'dies', after a certain amount of time, the terminal window seem to loose the connection with the underlying terminal in the linux container. It stops responding to any keyboard inputs. However if something was/is running it is still active. For instance when the Jekyll server is started in the Terminal, it will still be running although you lost the connection to that terminal/bash session.

### Copy paste (Chrome on windows)


### Extensions not found in marketplace
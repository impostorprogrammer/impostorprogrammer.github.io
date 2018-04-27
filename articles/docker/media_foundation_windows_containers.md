[//]: # ( spellcheck-language en )

# Server-Media-Foundation in Windows Server 2016 Docker container

I finally managed to get Server-Media-Foundation installed and working in Windows Server 2016 Docker container

## Quick steps to build Docker image
1. Make sure to use a base image that is based off microrosft/windowsservercore build number 14393 (Windows Server 2016)
2. Patch up all the C:\Windows\servicing\Packages\*.mum and remove any restart="required" attributes
3. Install-WindowsFeature Server-Media-Foundation
3. You can do some basic validation that MF is working now, see Validation below
4. Now you should be good to go...

## Docker file and script
You can find a Dockerfile and the script used to patch up the .mum files on [here on GitHub](https://github.com/JonasBr68/docker/tree/master/containers/servercoretest)

## Patching C:\Windows\servicing\Packages\*.mum files
Some of the solutions I did find that had worked (see references below), was patching selected mum files, but I realized two things, depending on the version/build of your base image the require set of files to patch might vary. And secondly, you will not be able to install any other component that requires a restart in the container anyway, so I just went a head with a script that removes any restart requirements. This can possibly work for other windows server feature installs as well. You mileage might vary...

## Gotchas
Some gotchas that I encountered. 
* `docker pull/build` will use image matching your build machine OS build number if base image is microsoft/aspnet
* If you build straight from microsoft/windowsservercore it defaults to WS2016 so then it is ok
* I have not been able to get it to work on 1709

## Validation of install
Although files and registry entries appears to be installed correctly on 1709, MF is not able to find any Media Foundation Transforms. I have been using the MFTEnum tool from [Matthew van Eerde's blog](https://blogs.msdn.microsoft.com/matthew_van_eerde/2010/05/03/how-to-enumerate-media-foundation-transforms-on-your-system/)
to validate the validity of the install. It is possible that if you don't need the Media Foundation Transforms in your scenario that it could still work on 1709, I just don't know. 

## Server 1709
Honestly I don't know why it doesn't work on 1709, I've been looking at c:\windows\Logs\CBS\CBS.log and comparing with 2016 but nothing has stood out, and no specific errors reported in 1709 that is different from 2016. Anyway, for me it is enough it works on 2016.

## Build number of your machine matters
I was trying to build my docker images based on microsoft/aspnet images, and I couldn't make it work. It turns out that if you are using a windows 10 machine to build your Docker images, and your windows 10 are on build 16299, be careful as it will use the microsoft/aspnet images that matches you machine's build number, i.e. on my Windows 10 it is 16299 which matches up with Windows Server 1709. If you build straight from microsoft/windowsservercore it defaults to WS2016 so then it is ok.
I figured this out after trying to build the same Dockerfile on a Windows Server 2016 and it works, turns out then it pulled a different microsoft/aspnet image that matched my server build number 14393 instead.
I did not yet try to build the Docker image on a 1709 server, but I suspect it is the same result. 

## Windows Server 1709 mystery
To note is that I was not able to get it to work on 1709, on 1709 you can run
`Install-WindowsFeature Server-Media-Foundation`and it reports success, and no need to reboot, but it does NOT work.
I also tried building a 1709 container on a 1709 server, but same result.

# References
* [Installing Server-Media-Foundation in a Docker Container](https://forums.docker.com/t/installing-server-media-foundation-in-a-docker-container/23587)
* [Installing Server-Media-Foundation in a Docker Container](https://social.msdn.microsoft.com/Forums/en-US/b646b841-c9fb-4f39-9662-5b59f02279ab/installing-servermediafoundation-in-a-docker-container?forum=windowscontainers)
* [Docker Recipe: Media Foundation on Windows Server Core ](https://withinrafael.com/2017/09/03/docker-recipe-media-foundation/)
* [How to enumerate Media Foundation transforms on your system](https://blogs.msdn.microsoft.com/matthew_van_eerde/2010/05/03/how-to-enumerate-media-foundation-transforms-on-your-system/)
* [Docs should clarify how to add Windows Feature that require server restart to container](https://github.com/MicrosoftDocs/Virtualization-Documentation/issues/155)
* [Installing ServerMediaFoundation Windows Feature in a Windows Core container?](https://www.reddit.com/r/docker/comments/57w70v/installing_servermediafoundation_windows_feature/)
* [Success! Running Plex Server in a Windows Server 2016 Docker Image](https://www.reddit.com/r/PleX/comments/7usiu1/success_running_plex_server_in_a_windows_server/)


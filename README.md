
# Signal-Desktop-Multiple-Portable

<img src=".github/header.jpg" width="100%" />

## What is it?

It is a modified Signal Desktop using the official source code, but with:

* Multiple instances, multiple accounts
* Portable
* Enable Tray Icon by default

Currently, I build for Windows only.

## Motivation
I need to use multiple signal numbers at the same time in a PC. However, there is no way to do that currently. So I decided to modify it.

## Download

https://github.com/louislam/Signal-Desktop-Multiple-Portable/releases/download/v1.40.1-mp1/signal-desktop-win-1.40.1-mp1.zip


## How to use

In the app folder, by default, there are two bat files for 2 profiles:
* SignalProfile1.bat
* SignalProfile2.bat

If you need more profiles, 
1. copy SignalProfile1.bat, rename it
1. open it with any text editor
1. change "profile1" to another name

```
@echo off
Start Signal.exe --profile <Your Profile Name>
```

The profiles are located in:

```
./profiles
```

## Original README

https://github.com/signalapp/Signal-Desktop

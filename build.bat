rd C:\wamp64\www\cordova\inschool\www /s /q
mkdir C:\wamp64\www\cordova\inschool\www


xcopy /s C:\wamp64\www\inschool C:\wamp64\www\cordova\inschool\www\
 

 del C:\wamp64\www\cordova\inschool\www\.gitignore
del C:\wamp64\www\cordova\inschool\www\build.bat /s /q
del C:\wamp64\www\cordova\inschool\www\build_windows.bat /s /q
rd C:\wamp64\www\cordova\inschool\www\_dump /s /q
rd C:\wamp64\www\cordova\inschool\www\README.MD /s /q


cd C:\wamp64\www\cordova\inschool
cordova run android --device
pause >nul
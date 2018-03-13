# App Inschool :iphone:

Não esqueça de subir a API:
https://bitbucket.org/marcospereda/inschool_api


Antes de fazer os processos abaixo seria interessante estar com a  depuração remota ativa no seu celular (No Android):
https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3 




## Subindo o Inschool na /www da localhost: 
```
SSH:
git clone git@bitbucket.org:marcospereda/inschool.git inschool

HTTPS:  
https://<USER>@bitbucket.org/marcospereda/inschool.git inschool
```

Obs: Caso você queira fazer o deploy no Android, necessário Android Studio [instalado e configurado](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)...   

Obs²: Caso você queira fazer o deploy no Iphone, necessário xCode [instalado e configurado](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)...   


Caso ocorra problemas no **javac** é necessario adicionar sua jre na sua [variavel de ambiente](https://john-dugan.com/add-php-windows-path-variable/) :  
No caso pode usar a propria do Android Studio que você já configurou, que fica localizada em:  
```
C:\Program Files\Android\Android Studio\jre\bin
```



## Criando o App/APK no Android: 
Após instalar o Android Studio e configurar:

```batch
npm install -g cordova  
cd C:\wamp64\www\  
mkdir cordova  
cd cordova  
cordova create inschool  
cd inschool  
cordova platform add android  
```



Caso queira fazer o Build no cordova basta mover o conteúdo da pasta recém criada:  
```C:\wamp64\www\inschool```  

Para :  
```C:\wamp64\www\cordova\inschool\www```
**(Ou execute o build.bat que fica na raiz do projeto)**  


------

## Criando o App/APK no Ios/Apple: 

Abra o Terminal.


```batch
cd /Applications/XAMPP/htdocs/  
git clone https://<USER>@bitbucket.org/marcospereda/inschool.git  
```

Copiar o conteudo da pasta: ```/Applications/XAMPP/htdocs/inschool```   
Mover para ```/Applications/XAMPP/htdocs/cordova/inschool```     


```batch  
cd /Applications/XAMPP/htdocs/cordova/inschool   
cordova run ios  
```

Aguarde o Emular do IOS abrir o Iphone SE 10.3 **(Pode levar alguns minutos)** 

Se tudo ocorrer bem o App vai instalar automaticamente e abrir atualizado.


Dica...

[Safari Web Inspector Guide](https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html) para visualizar a aba Console/Network/Etc dentro do Celular/Emulador.

------  

### Como fazer Deploy (Release / Gerar o .apk signed) :  
  
Utilize a key:  
```_dump\keys_android\apkinschoolkey.jks```  
 
Senha aqui:   
```_dump\keys_android\senha.txt```   

Dica: efetue pelo Android Studio o set da key, após isso apenas execute o comando abaixo:  
```
cordova build --release android --stacktrace
```

#### FIRE BASE / GCM: (Push-Notification)

SENDER_ID:
```
25799402961
```

Secret Key (Uso pela API): 
```
AAAABgHDpdE:APA91bHKZDfyRm3Rm-6ezmox6lfcRzumLYH6vHKisE7GA2hwxfoZ7PLgRjC1_z2pptrbj2THaDSCmPlCekaS1ZxTD_KYlyV56bZUMHVtKpa1iCqeyff0vhoz2yI8X_zwrjKAUK96l-VP
```  

Chave herdada do servidor:
```
AIzaSyAq5KhanJMgqRdoE0tnVX9E4gjUgNKPvvo
```


You can get here this info here:    
![Get Token FireBase-GCM](_dump/config.png)   

![Get Token FireBase-GCM](_dump/get_token.png)   



Ative o Plugin: phonegap-plugin-push for Android/IoS: 
```
cordova plugin add phonegap-plugin-push --variable SENDER_ID="25799402961"
```


#### Ícones, 'res' (Imagens):  

Caso ocorra algum problema no PUSH Notification, tem um back-up da estrutura do ```cordova create``` com os icones + plugins no arquivo:
```\inschool\_dump\cordova_create_inschool.rar```
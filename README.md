## About
Azureの音声読み上げAPIを使って音声ファイルを保存するためのスクリプト
https://azure.microsoft.com/ja-jp/services/cognitive-services/text-to-speech/

## How to use

### 1. リソース作成・キーとリージョンの取得
[公式ドキュメント](https://docs.microsoft.com/ja-jp/azure/cognitive-services/speech-service/overview#try-the-speech-service-for-free)を参考にしてSpeechのAzureリソースを作成し、キーとリージョンを取得する（ニューラル音声である七海・圭太を利用したい場合は米国東部、東南アジア、西ヨーロッパのいずれかのリージョンを選択）

### 2. .envファイルの作成
ルートディレクトリに.envファイルを作成し、AZURE_SUBSCRIPTION_KEYにキーを、AZURE_SERVICE_REGIONにリージョン名(e.g. southeast)を入れる。

```
AZURE_SUBSCRIPTION_KEY=xxxxxxx
AZURE_SERVICE_REGION=xxxxxxx
```

### 3. インプットファイルの作成
任意の名前でCSVファイルを作成し、読み上げたいテキストを改行区切りで保存する

```
ペン
パイナップル
アップル,0.9
```

カンマ区切りでスピードを指定することもできる（1.0=100%）

### 4. コマンド実行
```bash
$ yarn install
$ yarn speech [保存先フォルダ] [インプットファイルのパス] [声の名前(任意)]
```

e.g.
```bash
$ yarn speech ./out ./input.csv keita
```

声の名前は以下から選べます。デフォルトはnanami。
* nanami
* keita
* ayumi
* haruka
* ichiro

nanamiとkeitaはニューラル音声です。[Azure公式サイト](https://azure.microsoft.com/ja-jp/services/cognitive-services/text-to-speech/#features)で試すことができます。

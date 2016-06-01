$(function() {

  //======================================================================
  // 暗号化ボタン
  //======================================================================
  $('#encrypt').on('click', function () {
    
    var keyHex = CryptoJS.enc.Utf8.parse($('#encrypt-password').val());
    var encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse($('#encypt-text').val()), keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    
    $('#encypted-data').text(encrypted.toString());
  });

  //======================================================================
  // 復号ボタン
  //======================================================================
  $('#decrypt').on('click', function () {
    var keyHex = CryptoJS.enc.Utf8.parse($('#decrypt-password').val());
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse($('#encypted-data').val())
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    // return decrypted.toString(CryptoJS.enc.Utf8);
    
    // // あからじめ仕込んでおいた暗号化データのカンマ","を使って文字列をそれぞれに分割
    // var array_rawData = $('#encypted-data').text().split(',');

    // var salt = CryptoJS.enc.Hex.parse(array_rawData[0]);  // パスワードSalt
    // var iv = CryptoJS.enc.Hex.parse(array_rawData[1]);    // 初期化ベクトル（IV）
    // var encrypted_data = CryptoJS.enc.Base64.parse(array_rawData[2]); //暗号化データ本体

    // //パスワード（鍵空間の定義）
    // var secret_passphrase = CryptoJS.enc.Utf8.parse($('#decrypt-password').val());
    // var key128Bits500Iterations =
    //     CryptoJS.PBKDF2(secret_passphrase, salt, {keySize: 128 / 8, iterations: 500 });

    // //復号オプション（暗号化と同様）
    // var options = {iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7};

    // //復号
    // var decrypted = CryptoJS.DES.decrypt({"ciphertext":encrypted_data}, key128Bits500Iterations, options);
    // 文字コードをUTF-8にする
    var decStr = decrypted.toString(CryptoJS.enc.Utf8);
    var json = JSON.parse(decStr, "");
    var result = JSON.stringify(json, null, 4);
    // console.log(result);
    // $('#decrypt-text').val(result);
    console.log(result);
    $('#decrypt-text').html(result);
    // document.body.appendChild(document.createTextNode(JSON.stringify(json, null, 4)));
  });

});
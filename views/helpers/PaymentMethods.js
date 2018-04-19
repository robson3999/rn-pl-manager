import { NativeModules } from 'react-native';

let P24LibModule = NativeModules.P24LibModule;
const getUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const doTrnDirect = async () => {
    const settingsParams = {
        saveBankCredentials: true,
        readSmsPasswords: true,
        enableBanksRwd: true,
        banksRwdConfigUrl: "https://bh.przelewy24.pl/p24lib/getdata2.php"
    }
    const testTransactionParams = {
        merchantId: 64195,
        crc: 'd27e4cb580e9bbfe',
        sessionId: getUUID(),
        amount: 99,
        currency: "PLN",
        description: "Płatność za piosenkę w aplikacji Jukebox",
        email: "test@test.pl",
        country: "PL",
        client: "John Smith",
        address: "Test street",
        zip: "60-600",
        city: "Poznań",
        phone: "1246423234",
        language: "pl"
    }
    const trnDirectParams = {
        transactionParams: testTransactionParams,
        isSandbox: true,
        settingsParams: settingsParams
    }
    let {
        isSuccess,
        isCanceled,
        errorCode
    } = await P24LibModule.startTrnDirect(trnDirectParams)

    if (isSuccess) {
        return true
    } else if (isCanceled) {
        return false
    } else {
        console.log("Transfer error. Code: " + errorCode);
        return false
    }
};

export { getUUID, doTrnDirect };
import md5 from 'crypto-js/md5'

export default {
    encrypt: (value: string) => md5(value).toString()
}

/**
 * 判断终端类型
 *
 * @export
 * @param {*} target
 * @returns
 */
const isPc = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

export default isPc();
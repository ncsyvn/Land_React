
import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';

export default {
    upload(image) {
        return new Promise((resolve, reject) => {
            clientUtils.uploadFile(constants.api.image.upload, image).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },
}   
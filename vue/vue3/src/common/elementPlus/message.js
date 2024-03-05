/**
 * @file message
 */
import { ElMessage } from 'element-plus';

const showInfo = message => {
    ElMessage(message);
}
const showSuccess = message => {
    ElMessage({
        message,
        type: 'success',
    });
};
const showWarning = message => {
    ElMessage({
        message,
        type: 'warning',
    });
};
const showError = message => {
    ElMessage.error(message);
};

export default {
    showInfo,
    showSuccess,
    showWarning,
    showError
};
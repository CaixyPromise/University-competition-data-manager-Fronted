import {createStyles} from "antd-style";

const useStyles = createStyles(({ token }) => ({
    card: {
        marginBottom: '24px',
        '.ant-legacy-form-item .ant-legacy-form-item-control-wrapper': {
            width: '100%',
        },
    }
}));

export default useStyles;
import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';

export type ApplicationsProps = {
    data: {
        content?: string;
        updatedAt?: any;
        avatar?: string;
        owner?: string;
        href?: string;
    };
};
const ArticleListContent: React.FC<API.MessageVO> = ({
    data: { content, createTime, fromUser, targetUrl },
}) =>
{
    const { styles } = useStyles();
    return (
        <div>
            <div className={styles.description}>{content}</div>
            <div className={styles.extra}>
                {/*<Avatar src={avatar} size="small" />*/}
                来自于: <a href={targetUrl}>{fromUser}</a> 时间:
                <em>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</em>
            </div>
        </div>
    );
};
export default ArticleListContent;

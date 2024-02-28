import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';
type ArticleListContentProps = {
  data: {
    content: React.ReactNode;
    createAt: string;
    // avatar: string;
    // owner: string;

  };
};
const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { content, createAt,  },
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.description}>{content}</div>
      <div className={styles.extra}>
        {/*<Avatar src={avatar} size="small" />*/}
        {/*<a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>*/}
        <em>{dayjs(createAt).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  );
};
export default ArticleListContent;

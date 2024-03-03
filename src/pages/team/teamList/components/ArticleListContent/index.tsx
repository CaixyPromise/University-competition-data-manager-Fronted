import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';
type ArticleListContentProps = {
  data: {
    content: React.ReactNode;
    createAt: string;
    // needTime?: boolean
    // avatar: string;
    // owner: string;

  };
};
const ListContent: React.FC<ArticleListContentProps> = ({
  data: { content, createAt,  },
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.description}>{content}</div>
      <div className={styles.extra}>
        {/*<Avatar src={avatar} size="small" />*/}
        发布时间：<em>{dayjs(createAt).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  );
};
export default ListContent;

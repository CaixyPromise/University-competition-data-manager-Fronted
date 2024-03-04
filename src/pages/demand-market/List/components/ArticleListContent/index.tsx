import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';
type ArticleListContentProps = {
  data: {
    content: React.ReactNode;
    createAt: string;
    deadline: string
    // needTime?: boolean
    // avatar: string;
    // owner: string;

  };
};
const ListContent: React.FC<ArticleListContentProps> = ({
  data: { content, createAt, deadline },
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.description}>{content}</div>
      <div className={styles.extra}>
        {/*<Avatar src={avatar} size="small" />*/}
        发布时间：<span style={{marginRight: "10px"}}>{dayjs(createAt).format('YYYY-MM-DD HH:mm')}</span>
        结束时间：<span >{dayjs(deadline).format('YYYY-MM-DD HH:mm')}</span>
      </div>
    </div>
  );
};
export default ListContent;

import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'name',
          title: 'CAIXYPROMISE',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/CaixyPromise/University-competition-data-manager-Fronted',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '竞赛信息管理平台',
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

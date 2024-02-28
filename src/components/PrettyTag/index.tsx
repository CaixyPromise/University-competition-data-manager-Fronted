import {Tag} from "antd";
import React from "react";

/**
 * 自定义随机颜色的Tag，自定义配置tag背景颜色和文字颜色，尽可能做到兼容
 *
 * @author CAIXYPROMISE
 * @since 2024/2/28 04:20
 * @version 1.0
 */
interface IndexProps
{
    content: string; // 假设 content 是一个字符串
}

const Index: React.FC<IndexProps> = ({ content }) =>
{
    const getRandomRGBColor = () =>
    {
        const r = Math.floor(Math.random() * 256); // 红色分量
        const g = Math.floor(Math.random() * 256); // 绿色分量
        const b = Math.floor(Math.random() * 256); // 蓝色分量
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return {
            tagBgColor: `rgb(${r},${g},${b})`,
            tagTextColor: yiq >= 128 ? 'black' : 'white',
        };
    };
    const { tagBgColor, tagTextColor } = getRandomRGBColor();

    // 使用 content 属性
    return (
        <Tag
            style={{
                backgroundColor: tagBgColor,
                color: tagTextColor,
                borderColor: tagBgColor,
            }}
            key={content} // 如果 key 是必须的，确保它是唯一的
        >
            {content}
        </Tag>
    );
};

export default Index;
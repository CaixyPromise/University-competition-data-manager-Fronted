
/**
 * 编辑距离算法计算距离相近的标签，（用于推荐匹配排序）
 * @param tagList1
 * @param tagList2
 * @return
 */
export function minDistance(tagList1: string[], tagList2: string[]): number
{
    const n = tagList1.length;
    const m = tagList2.length;

    if (n * m === 0)
    {
        return n + m;
    }

    const d: number[][] = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    for (let i = 0; i < n + 1; i++)
    {
        d[i][0] = i;
    }

    for (let j = 0; j < m + 1; j++)
    {
        d[0][j] = j;
    }

    for (let i = 1; i < n + 1; i++)
    {
        for (let j = 1; j < m + 1; j++)
        {
            const left = d[i - 1][j] + 1;
            const down = d[i][j - 1] + 1;
            let leftDown = d[i - 1][j - 1];
            if (tagList1[i - 1] !== tagList2[j - 1])
            {
                leftDown += 1;
            }
            d[i][j] = Math.min(left, Math.min(down, leftDown));
        }
    }

    return d[n][m];
}

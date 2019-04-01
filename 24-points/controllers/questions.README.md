# 1.POST /24-point/add_question

## 描述

记录题目以及答案正确情况

## 请求参数

|   名称    |  类型   | 必填 | 默认值 |     说明      |
| :-------: | :-----: | :--: | :----: | :-----------: |
|  openid   | String  | Yes  |   -    |  微信 openid  |
| question  |  Array  | Yes  |   -    | 抽到的 4 张牌 |
| isCorrect | Boolean | Yes  |   -    | 答案是否正确  |
| gameplay  | String  | Yes  |   -    |     玩法      |

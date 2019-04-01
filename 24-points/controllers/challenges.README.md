# 1.POST /24-point/add_challenges

## 描述

记录用户挑战玩法成绩

## 请求参数

|   名称    |  类型  | 必填 | 默认值 |      说明      |
| :-------: | :----: | :--: | :----: | :------------: |
|  openid   | String | Yes  |   -    |  微信 openid   |
|  record   | Number | Yes  |   -    | 累计答对题目数 |
| totalTime | Number | Yes  |   -    |   答题总用时   |
| gameplay  | String | Yes  |   -    |      玩法      |
| userInfo  | :TODO  |  No  |   -    |    用户信息    |

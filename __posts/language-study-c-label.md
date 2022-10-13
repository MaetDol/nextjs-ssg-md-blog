---
categories:
  - language
  - C
date: '2016-09-26'
description: C언어 - 레이블
slug: language-study-c-label
tags:
  - language
  - C
  - syntax
  - label
  - goto
title: C언어 공부 - label(goto)
---

# 레이블

또는 무조건분기(?)

## 예제

```c
#include <stdio.h>

main()
{
MARK:
  printf("Hi again.\n");
  goto MARK;
}
```

## 문법

"레이블명:"의 형태로 레이블을 선언하고,
"goto 레이블명"의 형태로 해당 레이블로 이동합니다.
위 예제는 일종의 무한루프입니다.
레이블과 고-투를 이용하면 순환문이든 뭐든 해당 레이블로 실행줄을
이동시킵니다.

## 주의사항

레이블과 고투를 사용하는건 추천하지않습니다.
"왜죠? 요로케 조흔 기능을.."..
혹시, '스파게티 코드'를 아시나요?(맛있겠죠 헤헤..)
스파게티처럼 꼬이고 꼬여서 가독성이 바닥을 치다못해
뚫고가는..그런 비유적인 말 입니다.

절차지향적인 C언어에서는 흐름을 중요시하기때문에 goto문은
잘 안쓰일뿐더러 적대시(!!)받습니다.

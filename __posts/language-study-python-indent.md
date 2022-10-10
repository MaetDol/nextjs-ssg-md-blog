---
categories:
  - language
  - python3
date: '2022-10-10'
description: 파이썬에서의 들여쓰기
slug: language-study-python-indent
tags:
  - language
  - python3
  - syntax
  - indent
title: 파이썬 공부 - 들여쓰기
---

# 들여쓰기

## 문법

파이썬에서는 제어문이나 함수, 클래스에서 실행코드를 구분해 주는
괄호{}가 없습니다. 대신 파이썬에서는 들여쓰기가 구분해 주는 역할을 합니다.

제어문이나 함수이름, 클래스이름 뒤에 콜론:으로 끝을 표시하며
다음에 실행코드를 입력합니다.

    	if 'ABC' in str: print('ABC in str variable')

실행 문장이 여러줄일경우, 줄바꿈을 하게되는데, 반드시 들여쓰기를 해야합니다.
if 'ABC' in str:
print('ABC in str')
str2 = str

### 들여쓰기 기본규칙

1.  가장 바깥쪽의 실행코드는 들여쓰기없이 시작해야합니다.

        ( 공 백 ) if 'ABC' in str: ...
        # 문법 에러!

2.  콜론: 다음 줄부터 시작하는 실행코드의 들여쓰기는 간격이 모두 일정해야 합니다.

        if 'ABC' in str:
        	print('ABC in')
        		print('str')
        # 문법 에러!

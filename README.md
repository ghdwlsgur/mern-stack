### 😎 10/21 (목)
<hr>
## 쿠키와 세션을 사용하는 이유
> HTTP 프로토콜의 특징이자 약점을 보완하기 위해서 사용.


## HTTP 프로토콜 특징
- 비연결지향(Connectionless)
1. HTTP는 클라이언트가 요청(request)을 서버에 보내고, 서버는 클라언트에게 적절한 응답(response)을 주고<br>
연결을 끊는 특성이 있다.
2. HTTP1.1 버전에서는 커넥션을 계속 유지하고 요청(request)에 재활용하는 기능이 추가되었다.(HTTP Header)에 <br>
에 keep-alive 옵션을 주어 커넥션을 재활용하게 한다. HTTP1.1 버전에서는 디폴트(default)옵션이다.
- 상태없음(Stateless)
1. 커넥션을 끊는 순간 클라이언트와 서버의 통신이 끝나며 상태 정보는 유지하지 않는 특성이 있다.

HTTP는 이 두가지 특성을 보완하기 위해서 쿠키와 세션을 사용하게 되었다.<br>
비연결지향이라는 특성 덕분에 계속해서 커넥션을 유지하지 않기 때문에 서버 리소스 낭비가 줄어드는 것은 아주 큰 장점이지만, <br>
통신할 때마다 새로 커넥션을 만들기 때문에 클라이언트 측면에서는 상태를 유지를 위해 통신할 때마다 어떤 절차를 가져야 하는 단점이<br>
생긴다.


## 쿠키(Cookie)
쿠키는 클라이언트 로컬(local)에 저장되는 키와 값(key, value)이 들어있는 작은 데이터 파일이다. <br>
쿠키는 서버에서 HTTP Response Header에 Set-Cookie 속성을 이용하여 클라이언트에 쿠키를 제공한다. <br>
쿠키에는 이름, 값, 만료 날짜/시간(쿠키 저장기간), 경로 정보등이 들어있다.<br>
쿠키는 클라이언트의 상태 정보를 로컬에 저장했다가 요청(Request)할 때 참조된다. <br>
쿠키는 서버측에서 만료 날짜/시간을 지정하여 정해진 시간동안 데이터(상태정보)를 유지할 수 있다. (로그인 상태 유지에 활용된다.)<br>

## 세션쿠키(Session Cookie)와 지속 쿠키(Persistent Cookie)

쿠키는 세션 쿠키(Session Cookie)와 지속 쿠키(Persistent Cookie)로 나뉜다.<br>
만료 날짜/시간을 지정하지 않으면, '메모리에 있는 동안' 계속 유효하다고 판단하도록 세션 쿠키에 저장되고, 만료 날짜/시간을 지정<br>
하면 프로세스가 종료되더라도(메모리에서 사라지더라도) 특정 만료날짜/시간까지 유효하므로 지속 쿠키에 저장된다.<br>
세션 쿠키는 브라우저 메모리에 저장되므로 브라우저가 종료되어도 쿠키는 남아있게 된다.<br>
지속 쿠키는 파일로 저장되므로 브라우저가 종료되어도 쿠키는 남아있게 된다.<br>

참고로 세션 쿠키의 값은 보안상 꽤나 안전한 브라우저(크롬 etc)의 메모리에 저장되기 때문에 보안에 유리하지만 파일로 저장되는 <br>
지속 쿠키의 경우 비교적으로 보안에 취약하다. <br>

### 쿠키 프로세스
1. 브라우저에서 웹페이지에 접속한다.<br>
2. 클라이언트가 요청한 웹페이지를 응답으로 받으면서 HTTP 헤더를 통해 해당 서버에서 제공하는 쿠키 값을 응답으로 준다. <br>
3. 클라이언트가 웹페이지를 요청한 서버에 재 요청시 받았던 쿠키 정보도 같이 HTTP 헤더에 담아서 요청한다.<br>
4. 서버는 클라이언트의 요청(Request)에서 쿠키 값을 참고하여 비즈니스 로직을 수행한다.<br>

### 쿠키 사용사례
> 자동 로그인, 팝업 "오늘 더 이상 이 창을 보지 않음", 장바구니 ...

### 쿠키의 한계
- 클라이언트에 최대 300개까지 쿠키를 저장할 수 있다.
- 서버 도메인 하나당 최대 20개의 쿠키를 저장할 수 있다.
- 하나의 쿠키 값은 최대 4KB까지 저장할 수 있다.

> 쿠키는 사용자가 별도로 요청하지 않아도 브라우저(Client)에서 서버에 요청(Request)시에 Request Header에 쿠키 값을 <br>
넣어 요청한다. 그렇다고 그 많은 쿠키 값을 굳이 모든 요청에 넣어 비효율적으로 동작시키지 않는다. 도메인 설정을 통해 <br>
지정한 도메인으로 요청할 때만 쿠키값이 제공되도록 할 수 있다.

## 세션(Session)
서버(Server)에 클라이언트의 상태 정보를 저장하는 기술로 논리적인 연결을 세션이라고 한다. <br>
웹 서버에 클라이언트에 대한 정보를 저장하고 클라이언트에게는 클라이언트를 구분할 수 있는 ID를 부여하는데 이것을 세션아이디라고 한다.<br>

### 세션 프로세스
1. 클라이언트가 서버에 요청했을 때, 필요에 따라 세션에 클라이언트에 대한 데이터를 저장하고 세션아이디 응답을 통해 발급해준다. <br>
2. 클라이언트는 발급받은 세션아이디를 쿠키로 저장한다.<br>
3. 클라이언트는 다시 서버에 요청할 때, 세션 아이디를 서버에 전달하여 상태 정보를 서버가 활용할 수 있도록 해준다. <br>
결과적으로 세션을 통해 클라이언트의 정보는 서버에 두고, 세션아이디를 이용해서 인증받고 정보를 이용하는 방식이다.

## 세션 사용 사례
> 로그인 정보 유지


# 쿠키와 세션의 차이

## 저장 위치
쿠키는 클라이언트(브라우저) 메모리 또는 파일에 저장하고, 세션은 서버 메모리에 저장된다.

## 보안
- 쿠키는 클라이언트 로컬(local)에 저장되기도 하고 특히 파일로 저장되는 경우 탈취, 변조될 위험이 있고,<br>
Request/Response에서 스니핑을 당할 위험이 있어 보안이 비교적 취약하다. 반대로 세션은 클라이언트 정보 자체는 서버에 <br>
저장되어 있으므로 비교적 안전하다.

## 라이프 사이클
- 쿠키는 앞서 설명한 지속 쿠키의 경우에 브라우저를 종료하더라도 저장되어 있을 수 있는 반면에 세션은 서버에서 만료시간/날짜를 정해서<br>
지워버릴 수 있기도 하고 세션 쿠키에 세션 아이디를 정한 경우, 브라우저 종료시 세션아이디가 날아갈 수 있다.

## 속도
- 쿠키에 정보가 있기 때문에 서버에 요청시 헤더를 바로 참조하면 되므로 속도에서 유리하지만. 세션은 제공받은 세션아이디를 이용해서 <br>
서버에 다시 데이터를 참조해야 하므로 속도가 비교적 느릴 수 있다.

진행상황 : 회원가입, 로그인, 게시글 작성 REST API 작성, 테스트 완료 

### 😎 10/22 (금)
<hr>

보다 편리하게 유효성 검사를 진행하기 위해서 리액트 훅을 알아보던 중 useForm을 발견했다. !! <br>
## React Hook Form https://react-hook-form.com/ <br>

> React Hook Form은 React에서 Form을 쉽게 만들기 위한 라이브러리로 성능이 좋고 유연하며 유효성 검사에 탁월하다.

## 장점 <br>
- 적은 코드로 더 좋은 퍼포먼스를 낼 수 있다.
- 다른 라이브러리 혹은 React에 비해 Re-render수가 적다.
- Fast Mounting (로딩속도가 빠름)
- TS를 기본으로 지원

## Register 
> register은 input에서 값을 불러오기 위한 함수로 다른 옵션을 이용하면 input의 유효성 검사도 쉽게 할 수 있다.

먼저 register은 사용하기 위해서는 input에 다음과 같이 {...register("사용하고 싶은 이름")} 이라고 적어주면 <br>
나중에 적은 이름으로 값을 불러올 수 있다. '어떻게 값을 불러올까?' input에서 입력하는 값을 실시간으로 확인하기 위해서는 <br>
watch라는 함수를 사용할 수 있습니다.

## handleSubmit
> handleSubmit은 React Hook Form에서 Submit을 관리하기 위해 만든 함수이다.

handleSubmit은 함수를 인자로 받으며 그 함수에 data라는 인자를 넘겨준다. 이렇게 넘겨받은 데이터를 출력하면 watch 함수가 <br>
가장 마지막으로 출력하는 데이터를 볼 수 있다. 

## onError
> handleSubmit은 두가지 인자를 받는데 하나는 onSubmit으로 정상적으로 Submit 되었을 때 실행하는 함수이고 두번째 인자는<br>
onError로 Form에서 에러가 났을때 실행되는 함수입니다.
>> 여기서 에러는 Validation을 통과하지 못했다는 것을 의미합니다.

## mode: "onChange"
> 실시간으로 유효성 검사를 하게 하며 input에 validation을 설정한 다음에 useForm에서 errors라는 객체를 가져옵니다.
>> errors는 에러들이 담긴 객체로 모드가 onChange일 경우 에러가 실시간으로 업데이트 된다.

## + 폼 양식을 작성할 때는 공식문서에 있는 빌더를 이용하면 편리하다. 👍🏻👍🏻👍🏻 
<img src="https://user-images.githubusercontent.com/77400522/138428898-1f227695-2d62-4fb7-a0de-8cd0da2345df.png" width="100%" height="100%" />

진행상황 : 프론트엔드 로그인, 회원가입, 인증 구현 완료, 유효성 검사(진행)

### 😎 10/23 (토)
<hr>

클라이언트에서 보내는 데이터의 변수명과 디비에서 작성한 데이터의 변수명이 동일한지 확인하고 해당 로직에 관여하는 모든 코드를 살펴보았다... <br>
이름이 다른 변수들을 수정하고 클라이언트에서 요청하는 데이터가 서버에서 주는 데이터보다 더 많은 데이터를 요구하고 있었고 클라이언트에서 <br>
필요한 데이터이므로 데이터를 추가하고 유효성 검사를 기존에는 서버에서 joi 라이브러리를 활용할 계획이었으나 useForm이라는 <br>
훅을 알게되어 이것이 더 사용하기 편리하겠다고 생각하고 사용하게 되었는데 서버에서 작성해둔 joi 유효성 검사조건과 클라이언 <br>
트에서 작성한 유효성 조건이 일치하지 않았고 이 또한 에러의 원인이 되었다.<br>
다른 에러보다 Bad request 400에러가 처리하기 힘들다...가장 만나기 싫은 에러가 되었다<br>

회원가입 -> DB데이터 저장 확인 -> 토큰 미부여 -> 로그인 -> DB 토큰 생성 확인 -> 로그아웃 -> 토큰값 '' 확인


진행상황 : 로그인, 회원가입 bad request 400 error 해결 (프론트엔트 유효성 검사, 백엔드 joi 유효성 검사 충돌), 드롭다운 구성(게시판, 채팅, 문의하기), 헤더 css...


### 😎 10/24 (일)

에러 : 로그인 로직 수행중 비밀번호가 틀렸을 경우 "비밀번호가 틀렸습니다" 에러가 표시되어야 하는 상황에서 에러가 표시되지 않는 문제 <br>
특이점 : 데이터베이스에 가입된 이메일로 틀린 비밀번호를 입력하여 로그인을 실행할 경우 "비밀번호가 틀렸습니다" 정상 실행 <br>
하지만 데이터베이스에 없는 이메일로 로그인을 시도할 경우 bad request 400 발생. <br>
해결 : 로그인 라우터 수정 (이메일이 존재할 경우 status(400)을 전송하였는데 이것이 원인) <br>

## 수정 전 
```javascript
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // 이메일 존재여부확인 
    if(!user) {
      return res.status(400).json({
        success: false, 
        message: "해당 이메일에 가입된 사용자가 없습니다."
      });
    }
    // 비밀번호 비교 (몽고스키마 인스턴스 메소드)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ success: false, message: "비밀번호가 틀렸습니다." });
    // 토큰 생성 (몽고스키마 인스턴스 메소드)
      user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);
          res.cookie("auth_token", user.token).status(200)
          .json({
            _id: user._id,
            success: true
          });
      })
    })
  });
});

```

## 수정 후 
```javascript
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // 이메일 존재여부확인 
    if(!user) {
      return res.json({
        success: false, 
        message: "해당 이메일에 가입된 사용자가 없습니다."
      });
    }
    // 비밀번호 비교 (몽고스키마 인스턴스 메소드)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ success: false, message: "비밀번호가 틀렸습니다." });
    // 토큰 생성 (몽고스키마 인스턴스 메소드)
      user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);
          res.cookie("auth_token", user.token).status(200)
          .json({
            _id: user._id,
            success: true
          });
      })
    })
  });
});

```


### 😎 10/25 (월)

에러: 로그인을 하고 나면 토큰에 내가 저장한 사용자 정보 중 사용자 이름을 가져와서 상단바에 입력하고자 하여 useEffect를 사용하여<br>
마운트 시에 한 번만 렌더링시켰으나 로그인 후 새로고침이 되지 않아 이름 정보가 화면에 출력되지 않는 상황, 새로고침을 해야 상단바에 이름이 출력<br>

해결: 로그인 직후에 props.history.push('/')를 이용하여 페이지를 이동시켰으나 새로고침은 되지 않아 window.location.replace('/')<br>
를 사용하여 페이지 이동 후 새로고침 진행하자 화면에 이름이 출력되었다.<br>

키워드: 페이지간 데이터 이동(쿠키), useEffect(), 리액트 생명주기

## history.push vs window.location.href 비교

공통점
- 다른 페이지로 이동

차이점
- HTTP 요청<br>
history.push X | window.location.href O<br>
- 새로고침<br>
history.push X | window.location.href O<br>
- Application 상태 유지<br>
history.push O | window.location.href X<br>


> 좋은 UX와 상태 지속성을 위한다면 일반적인 페이지 이동은 history.push가 더 나은 선택일 수도... <br>
> 이동과 함께 새로고침이 필요한 경우는 window.location.href를 사용.

## push와 replace의 차이점 ??
Home > Item > Login > Item 순으로 페이지를 이동했을 때 Login 페이지에서 history.push / history.replace 사용시 차이점 <br>

- history.push
> Home > Item > Login > Item 순으로 history에 쌓여서 마지막 페이지에서 뒤로가기 버튼을 누르면 Login 페이지로 되돌아간다.

- history.replace
> Home > Item > Item 순으로 history에 쌓여서 마지막 페이지에서 뒤로가기 버튼을 누르면 Item 페이지로 되돌아간다.

history를 스택이라고 가정한다면 push는 history 최상단에 쌓는 것, replace는 history 제일 위에 있는 원소를 지금 넣을 원소로 바꾸는 것.

## useEffect()
```swift
useEffect(() => {
  ...
}, [deps])
```
1. 페이지가 처음 렌더링 되고 난 후 useEffect는 무조건 한 번 실행됩니다. [] <br>
2. useEffect에 배열로 지정한 useState의 값이 변경되면 실행되게 됩니다. <br>

즉, useEffect는 렌더링, 혹은 변수의 값 혹은 오브젝트가 달라지게 되면 그것을 인지하고 업데이트를 해주는 함수입니다.<br>
useEffect는 콜백 함수를 부르게 되며, 렌더링 혹은 값, 오브젝트의 변경에 따라 어떠한 함수 혹은 여러 개의 함수들을 <br>
동작시킬 수 있습니다.

### 😎 10/26 (화)
오늘은 현재까지 프로젝트를 진행하면서 사용했던 라이브러리들 중 개념이 익숙치 않거나 모호한 것들에 대해서 다시 한번 정리해보자.<br>

## Provider 

리액트로 컴포넌트를 만들 때, 상태 값 관리는 보통 props 또는 state로 관리한다. 리액트에는 사실 props와 state외에도<br>
상태를 관리하는 속성이 있다. 상태 관리(state management) 라이브러리로 react-redux, mobx-react 또는 react-apollo<br>
등이 있으며 현재 진행중인 프로젝트에서는 react-redux로 상태관리를 하고 있다. 또한 styled-components나 material-ui 등의<br>
ui라이브러리에서도 이 context를 사용하고 있다. 보통 이러한 라이브러리를 이용하면 Provider라는 이름의 컴포넌트를 제공하는데,<br>
이 컴포넌트안에서 context값을 핸들링 하고 있다. react-redux를 기준으로 한다면 앱을 실행할 때 아래와 같은 방법으로 앱을 <br>
선언할 것이다. <br>

```javascript
<Provider store={store}>
  <App/>
</Provider>
```
Provider의 역할은 우리의 App이 Redux.store에 접근할 수 있도록 해준다...<br>

<img src="https://user-images.githubusercontent.com/77400522/138813813-60e3d2fa-d891-46f2-9d40-a6c862cf1685.png" witdh="100%" height="100%" /><br>

## connect()
React.redux는 connect() 함수를 제공하여 우리의 컴포넌트를 store에 연결할 수 있도록 해줍니다.<br>
connect는 HOC(Higher-Order Component) 패턴이라고 하며 HOC란 컴포넌트를 특정 함수로 감싸서 특정 값 또는 함수를<br>
props로 받아와서 사용할 수 있게 해주는 패턴입니다.<br>
즉, connect 함수는 스토어의 상태를 props로 주입시켜주는 mapStateToProps와 액션 생성 함수를 스토어의 dispatch와 연결시켜<br>
props로 주입시켜주는 mapDispatchToProps를 인자로 받아서 새로운 HOC를 반환한다.

## Hoc
- 리액트는 함수형 프로그래밍을 지향한다.
- 컴포넌트는 (순수)함수이다. 즉, props를 받고 ReactElement 트리를 반환하는 순수함수이다.
- 함수형 프로그래밍에서는 Higher Order Function(HOF)라는 HOC와 유사한 개념이 있다.
- HOF는 함수를 인자로 받아서 새로운 함수를 반환하는 함수이다.
- HOF의 장점은 함수에 기능을 추가하는 코드를 재사용 할 수 있다는 것이다.
- Higher Order Component(HOC)는 바로 HOF에서 유래한 단어이다.
- 즉, 컴포넌트를 인자로 받아서 컴포넌트를 반환하는 함수를 뜻한다.
> HOC는 컴포넌트가 아닌 함수를 지칭하는데 이름이 Higher Order Component ? (just 끄덕끄덕)
- 가장 많이 쓰이는 형태는 스토어와 컴포넌트를 연결시켜 주는 HOC
- 최근 가장 널리 쓰이는 react-redux의 connect 함수도 이런 역할을 하는데, 엄밀히 말해 Hoc를 생성해주는 헬퍼 함수라고 할 수 있다.

### HOC로 할 수 있는 중요한 기능들
1. 생명주기 메소드 주입
2. State 및 이벤트 핸들러 주입
3. Props 변환 및 주입
4. Render 함수 확장

## ReactNode / ReactElement
- 클래스형 컴포넌트는 render메소드에서 ReactNode를 리턴한다.
- 함수형 컴포넌트는 ReactElement를 리턴한다.
- jsx는 바벨에 의해서 React.createElement(component, props, ...children)함수로 트랜스파일 된다.

## jsx
```javascript
<div>Hello {this.props.toWhat}</div>
<Hello toWhat="World" />
```

## jsx --> babel(transpile)
```javascript
React.createElement('div', null, `Hello${this.props.toWhat}`);
React.createElement(Hello, {toWhat:'World'}, null);
```

## 이 React.createElement의 리턴 타입이 바로 ReactElement와 JSX.Element이다.
정리하자면 함수형 컴포넌트안에서 사용된 jsx는 바벨에 의해서 React.createElement함수로 변환되고 <br>
이 변환된 함수가 ReactElement를 리턴한다. <br>

<img src="https://user-images.githubusercontent.com/77400522/138818797-252353bb-9aae-4a67-833d-064c55644420.png" width="100%" height="100%"/>

## ReactElement 호출시 리턴되는 객체
```javascript
interface ReactElement<P=any, T extends string | JSXElementConstructor<any>=string | JSXElementConstructor<any>> {
  types: T;
  props: P;
  key: Key | null;
}
```

## ReactNode
```javascript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> { }
type ReactFragment = { } | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

## uaeSelector란 ?
useSelector는 리덕스의 상태값을 조회하기 위한 hook 함수로 이전의 connect를 통해 상태값을 조회하는 것보다 훨씬 간결하게<br>
작성하고 코드 가독성이 상승되는 장점이 있는 함수이다.<br>



## 로컬 스토리지 vs 세션 스토리지
||로컬 스토리지|세션 스토리지|
|:---:|:---:|:---:|
|데이터 영구|O (사용자가 지우지 않는 한)|X (윈도우, 탭 닫을시 내용 제거)|
|사용방법|자동 로그인|일회성 로그인|
|주의사항|비밀번호와 같은 중요 정보는 절대 저장 X|비밀번호와 같은 중요 정보는 절대 저장 X|


쿠키의 단점을 보완해 HTML5에서 '웹스토리지' 라는 기술 탄생
- 웹스토리지: 로컬스토리지, 세션스토리지
- 웹스토리지는 Key와 Value 형태로 이루어짐
- 웹스토리지는 클라이언트에 대한 정보를 저장.
- 웹스토리지는 로컬에만 정보를 저장, 쿠키는 서버와 로컬에 정보를 저장.

로컬스토리지는 클라이언트에 대한 정보를 영구적으로 저장<br>
세션 스토리지는 세션 종료 시(브라우저를 닫을 경우) 클라이언트에 대한 정보 삭제<br>
### 로컬&세션스토리지 장점
1. 서버에 불필요하게 데이터를 저장하지 않는다.
2. 용량이 크다. (약 5MB, 브라우저마다 차이 존재)
### 로컬&세션스토리지 단점
1. HTML5를 지원하지 않는 브라우저의 경우 사용 불가

현재 진행하는 프로젝트에서는 userId와 같은 정보를 로그인시에 로컬 스토리지에 저장하고 페이지를 이동하면서 필요할 때 <br>
로컬스토리지에 저장된 userId를 불러와서 사용하거나 자동로그인을 구현할 때 사용할 것이다. 구현하기에 앞서 실습 먼저 해보자.<br>

## [실습] 웹스토리지(로컬스토리지) <br>
```javascript
import React, { useState, useEffect } from 'react';
function Counter() {
  const [count, setCount] = useState(() => JSON.parse(window.localStorage.getItem("count")) || 0);
  useEffect(() => {
    window.localStorage.setItem("count", JSON.stringify(count));
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

> useEffect() 함수는 count 상태값이 변경될 때마다 호출, 웹 스토리지는 오직 문자형 데이터만 지원하기 때문에 데이터를 쓰기전에 <br>
JSON.stringify() 함수로 직렬화하고, 읽기 전에 JSON.parse()함수로 역 직렬화 합니다.

## Serialize. <br>
### 직렬화와 역직렬화는 디스크로의 저장으로도 사용하지만 네트워크간의 데이터 전송에서도 많이 사용되는 개념. <br>

직렬화 ? (JSON.stringify())
- 객체를 직렬화하여 전송 가능한 형태로 만드는 것.
- 객체들의 데이터를 연속적인 데이터로 변형하여 Stream을 통해 데이터를 읽도록 해준다.

역직렬화 ? (JSON.parse())
- 직렬화된 파일 등을 역으로 직렬화하여 다시 객체의 형태로 만드는 것.
- 저장된 파일을 읽거나 전송된 스트림 데이터를 읽어 원래 객체의 형태로 복원한다.


<img src="https://user-images.githubusercontent.com/77400522/138825638-50836909-a05b-4496-b0ae-c698a216ca94.png" width="100%" height="100%" />

## Code Spliting 

싱글페이지 어플리케이션에서 번들 사이즈가 커지면 로딩속도나 성능면에서 문제가 생길 수 있다. <br>
코드 스플리팅은 이것들을 여러개의 번들로 나누거나 동적으로 import하는 기법을 말한다.

## Loadable Components

React가 자체적으로 제공하는 React.lazy나 React.suspense도 있지만 SSR까지 커버 가능하고 사용방법이 거의 동일한 <br>
Loadable Components를 페이스북에서도 추천하고 있다.


진행상황: 게시글, 댓글, 좋아요 스키마 작성, REST API 테스트 및 작성 완료, 리액트 구현 ing <br>
개념보완 키워드: # useCallback, useEffect 차이점 # 몽구스 populate, ref 참조


<hr>

### 😎 10/27 (수)

#### useMemo와 useCallback은 리액트의 렌더링 성능 최적화를 위한 hook
- 함수형 컴포넌트는 그냥 함수이고 단지 jsx를 반환하는 함수이다.
- 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수(컴포넌트)를 호출하여서 실행되는 것을 말한다. 함수가 실행될 때마다 내부에
선언되어 있던 표현식(변수, 또 다른 함수 등)도 매번 다시 선언되어 사용된다.
- 컴포넌트는 자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다 리렌더링 된다. (하위 컴포넌트에
최적화 설정을 해주지 않으면 부모에게서 받는 props가 변경되지 않았더라도 리렌더링 되는것이 기본)

## useMemo
- 메모리제이션된 값을 반환한다.
- CASE: 특정 상황에서만 동작되어야 하는 함수가 Component의 렌더링 조건에 따라 지속적으로 함수가 실행되는 경우
- useMemo는 deps가 변경되기 전까지 값을 기억하고, 실행 후 값을 보관하는 역할로도 사용한다.
- 복잡한 함수의 return 값을 기억한다는 점에서 useRef와는 다르다.
- useRef는 특정 값을 기억하는 경우, useMemo는 복잡한 함수의 return값을 기억하는 경우에 사용한다.

## useCallback
- 메모리제이션된 함수를 반환한다.
- CASE: useMemo가 특정 value를 재사용하기 위함이라면 useCallback은 특정 함수를 재사용하기 위함이다.
- 자식 컴포넌트에 함수를 props로 줄때는 반드시 useCallback을 사용하여 리렌더링이 안되도록 하자.

### 브라우저와 리액트앱의 라우터를 연결하게 되면 그 결과 라우터가 history api에 접근할 수 있게 되며 각각의 Route와 연결된 컴포넌트에 props로 match, location, history라는 객체를 전달하게 된다.

## Match
match 객체에는 <Route path>와 URL이 매칭된 것에 대한 정보가 담겨져있다. <br>
대표젹으로 match.params로 path에 설정한 파라미터값을 가져올 수 있다. <br>
> 현재 프로젝트에서 REST API를 작성할 때 파라미터로 값을 넘겨주는 URL을 많이 포함하고 있는데 파라미터 값을 가져올 때 사용해봐야겠다.
 
- path: [string] 라우터에 정의된 path
- url: [string] 실제 클라이언트로부터 요청된 url path
- isExact: [boolean] true일 경우 전체 경로가 완전히 매칭될 경우에만 요청을 수행
- params: [JSON object] url path로 전달된 파라미터 객체
 
## Location
location 객체에는 현재 페이지의 정보를 가지고 있다. 대표적으로 location.search로 현재 url의 쿼리 스트링을 가져올 수 있다.
  
> 게시글 리스트의 경우 두가지 버전으로 나누어 백단 로직을 짜놓았고 하나는 쿼리스트링을 사용한 페이지네이션이고 다른 하나는 body로 페이지번호를 입력받는 페이지네이션이다. 나는 후자의 경우로 페이지네이션을 사용할 것이므로 location.search를 사용할 일은 없을 것 같다.
  
- path: [string] 현재 페이지의 경로명
- search: [string] 현재 페이지의 query string
- hash: [string] 현재 페이지의 hash
  
## History
history 객체는 브라우저의 history와 유사하다. 스택(stack)에 현재까지 이동한 url 경로들이 담겨있는 형태로 주소를 임의로 변경하거나 되돌아갈 수 있도록 해준다.

- length: [number] 전체 history 스택의 길이
- action: [string] 최근에 수행된 action (PUSH, REPLACE, or POP)
- location: [JSON object] 최근 경로 정보
- push(path, [state]): [function] 새로운 경로를 history 스택으로 푸시하여 페이지를 이동
- replace(path, [state]): [function] 최근 경로를 history 스택에서 교체하여 페이지를 이동
- go(n): [function] history 스택의 포인터를 n번째로 이동
- goBack(): [function] 이전 페이지로 이동
- goForward(): [function] 앞 페이지로 이동
- block(prompt): [function] history 스택의 PUSH/POP 동작을 제어
  

진행상황: 게시글 리스트 가져오기, 사용자 id, name 로그인시 로컬스토리지에 저장, 로그아웃시 로컬스토리지 정보 삭제










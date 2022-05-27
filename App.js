import React, { Component } from 'react';
import { BackHandler,ToastAndroid,useRef  } from 'react-native';
import { WebView } from 'react-native-webview';






class MyWebComponent extends Component {

  webView = {
    canGoBack: false,
    ref: null,
  }




  // 메인이아니면 페이지 뒤로가기만되게 
  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  //메인페이지에서 뒤로 2번연속하면 꺼짐 메인아니면 뒤로가게
  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료

    if (this.webView.canGoBack && this.webView.ref) {


      this.webView.ref.goBack();
      return true;
    }else{
      if (this.exitApp == undefined || !this.exitApp) {


        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;

        this.timeout = setTimeout(
            () => {
                this.exitApp = false;
            },
            2000    // 2초
        );
    } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp();  // 앱 종료
    }
    return true;
    }

}
    // 이벤트 등록
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      console.log('sadsad');

      
  }

  // 이벤트 해제
  componentWillUnmount() {
      this.exitApp = false;
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  // http://210.91.154.159/web_all6.html
  render() {
    return (
      <WebView source={{ uri: 'http://210.91.154.159/quest/' }}
      ref={(webView) => { this.webView.ref = webView; }}
      onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack;

      }}




      


      
       />

       
    );
  }
}

export default MyWebComponent

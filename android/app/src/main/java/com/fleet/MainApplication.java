package com.fleet;

import android.app.Application;
import android.util.Log;

import com.baidu.mapapi.SDKInitializer;
import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication
{

	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this)
	{
		@Override
		protected boolean getUseDeveloperSupport()
		{
			return BuildConfig.DEBUG;
		}

		@Override
		protected List<ReactPackage> getPackages()
		{
			return Arrays
					.<ReactPackage> asList(new MainReactPackage(),
            new RCTCameraPackage(), new VectorIconsPackage(), new MyReactPackage());
		}

		@Nullable
		@Override
		protected String getBundleAssetName() {
			return "index.android.jsbundle";
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost()
	{
		return mReactNativeHost;
	}

	@Override
	public void onCreate()
	{
		super.onCreate();

		// 初始化百度地图
		SDKInitializer.initialize(getApplicationContext());
	}
}

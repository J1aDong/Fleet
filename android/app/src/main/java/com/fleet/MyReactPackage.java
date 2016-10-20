package com.fleet;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by J1aDong on 2016/10/20.
 */

public class MyReactPackage implements ReactPackage
{
	@Override
	public List<NativeModule> createNativeModules(
			ReactApplicationContext reactContext)
	{
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends JavaScriptModule>> createJSModules()
	{
		return Collections.emptyList();
	}

	@Override
	public List<ViewManager> createViewManagers(
			ReactApplicationContext reactContext)
	{
		List<ViewManager> modules = new ArrayList<>();
		modules.add(new RCTBdMapManager());
		return modules;
	}
}

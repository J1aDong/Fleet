package com.fleet;

import android.util.Log;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.model.LatLng;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by J1aDong on 2016/10/19.
 */

public class RCTBdMapManager extends SimpleViewManager<MapView>
{
	public static final String REACT_CLASS = "RCTBdMap";
	private MyLocationConfiguration.LocationMode mCurrentMode;
	private BaiduMap mBaiduMap;
	private LocationClient mLocClient;
	public MyLocationListenner myListener = new MyLocationListenner();
	private MapView mView;
	private boolean isFirstLoc = true; // 是否首次定位
	private ThemedReactContext mReactContext;

	@Override
	public String getName()
	{
		return REACT_CLASS;
	}

	@Override
	protected MapView createViewInstance(ThemedReactContext reactContext)
	{
		mView = new MapView(reactContext);
		mReactContext = reactContext;
		return mView;
	}

	@ReactProp(name = "location", defaultBoolean = false)
	public void setLocation(MapView view, boolean isLocation)
	{
		mCurrentMode = MyLocationConfiguration.LocationMode.NORMAL;
		mBaiduMap = view.getMap();
		// 开启定位图层
		if( isLocation )
		{
			mBaiduMap.setMyLocationEnabled(true);
		}
		else
		{
			mBaiduMap.setMyLocationEnabled(false);
		}
		mLocClient = new LocationClient(view.getContext()
				.getApplicationContext());
		mLocClient.registerLocationListener(myListener);
		LocationClientOption option = new LocationClientOption();
		option.setOpenGps(true); // 打开gps
		option.setCoorType("bd09ll"); // 设置坐标类型
		option.setScanSpan(1000);
		mLocClient.setLocOption(option);
		if( isLocation )
		{
			mLocClient.start();
		}
		else
		{
			mLocClient.stop();
		}
		isFirstLoc = true;
	}

	/**
	 * 定位SDK监听函数
	 */
	public class MyLocationListenner implements BDLocationListener
	{

		@Override
		public void onReceiveLocation(BDLocation location)
		{
			// map mView 销毁后不在处理新接收的位置
			if( location == null || mView == null )
			{
				return;
			}

			double latitude = location.getLatitude(); // 纬度
			double longitude = location.getLongitude(); // 经度

			Log.w(REACT_CLASS, "latitude-->" + latitude + ",longitude-->"
					+ longitude);

			WritableMap map = Arguments.createMap();
			map.putDouble("latitude", latitude);
			map.putDouble("longitude", longitude);
			mReactContext.getJSModule(RCTEventEmitter.class)
					.receiveEvent(mView.getId(), "topChange", map);

			MyLocationData locData = new MyLocationData.Builder()
					.accuracy(location.getRadius())
					// 此处设置开发者获取到的方向信息，顺时针0-360
					.direction(100).latitude(location.getLatitude())
					.longitude(location.getLongitude()).build();
			mBaiduMap.setMyLocationData(locData);
			if( isFirstLoc )
			{
				isFirstLoc = false;
				LatLng ll = new LatLng(location.getLatitude(), location
						.getLongitude());
				MapStatus.Builder builder = new MapStatus.Builder();
				builder.target(ll).zoom(18.0f);
				mBaiduMap.animateMapStatus(MapStatusUpdateFactory
						.newMapStatus(builder.build()));
			}
		}

		public void onReceivePoi(BDLocation poiLocation)
		{
		}
	}

}

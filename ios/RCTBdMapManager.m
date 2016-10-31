//
//  RCTBdMapManager.m
//  Fleet
//
//  Created by J1aDong on 2016/10/19.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <BaiduMapAPI_Map/BMKMapView.h>

#import "RCTViewManager.h"
#import "MyBdMapView.h"

@interface RCTBdMapManager : RCTViewManager
@end

@implementation RCTBdMapManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(location, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange,RCTBubblingEventBlock)

- (UIView *)view {
    MyBdMapView *mapView = [[MyBdMapView alloc] init];
    return mapView;
}

@end

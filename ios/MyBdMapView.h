//
//  MyBdMapView.h
//  Fleet
//
//  Created by J1aDong on 2016/10/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <BaiduMapAPI_Map/BMKMapView.h>
#import <BaiduMapAPI_Location/BMKLocationService.h>
#import "RCTComponent.h"

@interface MyBdMapView : BMKMapView <BMKLocationServiceDelegate> {
    BMKLocationService *_locService;
}

@property(assign, nonatomic) BOOL location;
@property(nonatomic, copy) RCTBubblingEventBlock onChange;

@end
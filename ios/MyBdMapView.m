//
//  MyBdMapView.m
//  Fleet
//
//  Created by J1aDong on 2016/10/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MyBdMapView.h"


@implementation MyBdMapView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];

    // 初始化BMKLocationService
    _locService = [[BMKLocationService alloc] init];
    _locService.delegate = self;

    self.showsUserLocation = YES;

    return self;
}

/**
 *用户方向更新后，会调用此函数
 *@param userLocation 新的用户位置
 */
- (void)didUpdateUserHeading:(BMKUserLocation *)userLocation {
    NSLog(@"heading is %@", userLocation.heading);
    [self updateLocationData:userLocation];
}

/**
 *用户位置更新后，会调用此函数
 *@param userLocation 新的用户位置
 */
- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation {
    NSLog(@"didUpdateUserLocation lat %f,long %f", userLocation.location.coordinate.latitude, userLocation.location.coordinate.longitude);
    [self updateLocationData:userLocation];
}

- (void)setLocation:(BOOL)location {
    if (location) {
        // 启动LocationService
        [_locService startUserLocationService];
        self.userTrackingMode = BMKUserTrackingModeFollow;
    } else {
        [_locService stopUserLocationService];
        self.userTrackingMode = BMKUserTrackingModeNone;
    }

}


@end

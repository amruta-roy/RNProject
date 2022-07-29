import React from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    Image, 
    ImageBackground,
    Alert,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';

import clock from '../assets/images/clock.jpg';
import comments from '../assets/images/comments.png';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const CourseDisplay = (props) => {
    const courseType = props.courseType;
    const courseData = props.courseData;
   
    // console.log("CourseType: ",courseType);
    // console.log("CourseData: ",courseData);
 
    return (
        <>
            {
                // Display data for 'Recent' Courses
                courseType == 'recent' ? 
                (
                    <View style={{ flexDirection:"column" , width: wp(45), height:hp(30), borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10}}>
                        <ImageBackground
                            key={courseData.name}
                            source={courseData.image }
                            resizeMode="cover" 
                            style={{ width: "100%", height: hp(15) , flexDirection: 'column', alignSelf:'center'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                        </ImageBackground>
                            <Text style={{ ...styles.txtSource, marginVertical: hp(1), width:'100%', paddingHorizontal: wp(4) }}>
                                { courseData.subject }
                            </Text>
                            <Text style={{ ...styles.txtCourseName, marginTop: hp(0.5), width:'100%', paddingHorizontal: wp(4) }}>
                                {courseData.name}
                            </Text>
                        <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around',height: hp(5), width: "100%", marginVertical: hp(1.5),}}>
                            {/* (courseData.completed / courseData.total) */}
                            <ProgressBar 
                                progress={(courseData.completed / courseData.total) ? (courseData.completed / courseData.total) : 0} 
                                color="#51C3FE" 
                                style={{ marginTop: hp(0.7),height: hp(1), width: wp(33), borderRadius: 20}}/>

                            <Text >{courseData.completed}{"/"}{courseData.total}</Text>
                        </View>
                        <View style={{height:hp(2)}}></View>
                    </View>
                )
                : courseType == 'recommended' ? (

                    <View style={{ flexDirection:"column" , height: hp(30), width: wp(40), borderRadius: 10}}>
                        <ImageBackground
                            key={courseData.name}
                            source={courseData.image }
                            resizeMode="cover" 
                            style={{ width: "100%", height: hp(15) , flexDirection: 'column', alignSelf:'center'}} imageStyle={{ borderRadius: 10 }}>
                        </ImageBackground>
                        <View style={{ flexDirection:'column', width: "100%", height: hp(7)}}>
                            <Text style={{ ...styles.txtCourseName, marginVertical: hp(1), width:'100%',}}>
                                { courseData.name }
                            </Text>
                        </View>
                        <View style={{ flexDirection:'row', justifyContent:'space-between' ,height: hp(5), width: "100%", marginTop: hp(1) }}>
                            <Text>{courseData.totalLessons} Lessons</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Image 
                                    source={clock}
                                    style={{ height: hp(2), width: wp(4)}}
                                />
                                <Text>{courseData.courseDuration}</Text>
                            </View>
                        </View>
                    </View>

                )
                : courseType == 'news' ? (

                    <View style={{ height: hp(18) , flexDirection:'row', alignItems:"flex-start"}}>
                        <ImageBackground
                            key={courseData.name}
                            source={courseData.image }
                            resizeMode="cover" 
                            style={{ width: wp(40), height:"100%" , flexDirection: 'column', alignSelf:'center'}} imageStyle={{ borderRadius: 10 }}>
                        </ImageBackground>
                        <View style={{ flexDirection:'column', alignItems:'flex-start', height: "100%", width: wp(58) }}>
                            <Text style={{ ...styles.txtLarge, marginVertical: hp(1), paddingHorizontal: wp(4) }}>
                                { courseData.subject }
                            </Text>
                            <Text style={{ ...styles.txtCourseName, marginVertical: hp(2), width:'100%', paddingHorizontal: wp(4) }}>
                                { courseData.name }
                            </Text>
                            <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between' ,height: hp(7), width: '90%', paddingHorizontal: wp(2) }}>
                                <View style={{ flexDirection: 'row'}}>
                                    <Image 
                                        source={clock}
                                        style={{ height: hp(2), width: wp(4)}}
                                    />
                                    <Text> {courseData.time}</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                    <Image 
                                        source={comments}
                                        style={{ height: hp(2), width: wp(4)}}
                                    />
                                    <Text> {courseData.comments}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: hp(4)}}></View>
                    </View>

                )
                : null
            }
        </>
    );
}

export default CourseDisplay;

const styles = StyleSheet.create({
    txtLarge : {
        color: '#000', 
        fontSize: 14, 
    },
    txtMedium : {
        color: '#fff', 
        fontSize: 20 , 
        fontWeight: "bold"
    },
    txtCourseName: {
        fontSize: 16,
        color: '#000'
    },
    flexRowSpace: {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    flexRowStart : {
        flexDirection:'row', 
        justifyContent:'flex-start'
    }
});

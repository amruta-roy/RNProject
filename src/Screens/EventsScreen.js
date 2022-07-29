import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity , 
    Image,
    Alert,
    ScrollView,
    StyleSheet,
    StatusBar
} from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';

import bellIcon from '../assets/images/BellIcon.jpg';
import recentImg1 from '../assets/images/Recent1.png';
import recentImg2 from '../assets/images/Recent2.png';
import recomImg1 from '../assets/images/Recommended1.png';
import recomImg2 from '../assets/images/Recommended2.png';
import recomImg3 from '../assets/images/Recommended3.png';
import latestNews1 from '../assets/images/Latest1.png';
import latestNews2 from '../assets/images/Latest2.png';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import CourseDisplay from '../components/CourseDisplay';

const EventsScreen = () => {

    const [searchTxt, setSearchTxt] = useState('');
    const [tabbar, setTabbar] = useState(true);

    // masterDataSource to store the originally fetched data
    const [masterRecentCourses, setMasterRecentCourses] = useState([
        {
            subject: "Mathematics",
            name: 'High School Algebra I: Help and Review',
            completed: 5,
            total: 10,
            image: recentImg1
        },
        {
            subject: "Mathematics",
            name: 'Enlargement to Trigonometry',
            completed: 7,
            total: 10,
            image: recentImg2
        },
        {
            subject: "Mathematics",
            name: 'Complete Trigonometry',
            completed: 5,
            total: 10,
            image: recentImg1
        },
    ]); 
    // filteredDataSource to store the data filtered according to the search Text
    const [filteredRecentCourses, setFilteredRecentCourses] = useState([]);

    // masterDataSource to store the originally fetched data
    const [masterRecommCourses, setMasterRecommCourses] = useState([
        {
            name: 'Bacterial Biology Overview',
            totalLessons: 10,
            courseDuration: "12h 20m",
            image: recomImg1
        },
        {
            name: 'Mendelian Genetics & Mechanisms of Her...',
            totalLessons : 14,
            courseDuration: "18h 20m",
            image: recomImg2
        },
        {
            name: 'Metabolic Biochemistry for High School',
            totalLessons: 12,
            courseDuration: "12h 20m",
            image: recomImg3
        },
    ]);  
    // filteredDataSource to store the data filtered according to the search Text
    const [filteredRecommCourses, setFilteredRecommCourses] = useState([]);
    
    // masterDataSource to store the originally fetched data
    const [masterAlgebraCourses, setMasterAlgebraCourses] = useState([
        {
            name: 'Algebra Beginners',
            totalLessons: 10,
            courseDuration: "12h 20m",
            image: recentImg1
        },
        {
            name: 'Complete Algebra',
            totalLessons : 14,
            courseDuration: "18h 20m",
            image: recentImg2
        },
        {
            name: 'Advanced Algebra course',
            totalLessons: 12,
            courseDuration: "12h 20m",
            image: recentImg1
        },
    ]);  
    // filteredDataSource to store the data filtered according to the search Text
    const [filteredAlgebraCourses, setFilteredAlgebraCourses] = useState([]);

    const latestNews = [
        {
            subject: 'Biology',
            name: 'The Effects of Temperature on Enzyme Activity and Biology',
            time: "1 hour ago",
            comments: 4795,
            image: latestNews1
        },
        {
            subject: 'Mathematics',
            name: 'How to Work Out a Percentage Using a Calculator',
            time: "24 Aug 2020",
            comments: 4795,
            image: latestNews2
        },
        {
            subject: 'Biology',
            name: 'The Effects of Temperature on Enzyme Activity and Biology1',
            time: "1 hour ago",
            comments: 4795,
            image: latestNews1
        },
    ];

    useEffect(() => {
        setFilteredRecentCourses(masterRecentCourses);
        setFilteredRecommCourses(masterRecommCourses);
        setFilteredAlgebraCourses(masterAlgebraCourses);
    },[])

    // Function to search through the courses for user entered search text .
    const searchFilterFunction = (text) => {
        
        // Check whether search string is empty
        if (text) {
            // convert search text to Uppercase
            const textData = text.toUpperCase();

            // traverse through the original data
            const newRecentData = masterRecentCourses.filter(function (item) {

                // convert the current records data to Uppercase
                const itemSubject =   item.subject ? item.subject.toUpperCase() : ''.toUpperCase();
                const itemName = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        
                // Check if current record 'title', 'source.name' matches with the user entered Search string
                //   if yes - return the record and save it to 'newData'
                if (itemSubject.indexOf(textData) > -1) {
                    return true;
                } else if (itemName.indexOf(textData) > -1) {
                    return true;
                }
          });

          console.log("Filtered REcent data: ",newRecentData)

          const newRecommData = masterRecommCourses.filter(function (item) {

            // convert the current records data to Uppercase
            const itemName = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    
            // Check if current record matches with the user entered Search string
            //   if yes - return the record
            if (itemName.indexOf(textData) > -1) {
                return true;
            }
      });

                // traverse through the original data
            const newAlgebraData = masterAlgebraCourses.filter(function (item) {

                // convert the current records data to Uppercase
                const itemName = item.name ? item.name.toUpperCase() : ''.toUpperCase();

                // Check if current record matches with the user entered Search string
                //   if yes - return the record
                if(itemName.indexOf(textData) > -1) {
                    return true;
                }
            });
    
          // The records which matched the search string are being set to "filteredDataSource" 
          // which in turn will be rendered on the screen.
          setFilteredRecentCourses(newRecentData);
          setFilteredRecentCourses(newRecommData);
          setFilteredAlgebraCourses(newAlgebraData);
          setSearchTxt(text);
        } 
        else {   // search text is empty, display all the original records
            setFilteredRecentCourses(masterRecentCourses);
            setFilteredRecommCourses(masterRecommCourses);
            setFilteredAlgebraCourses(masterAlgebraCourses);
            setSearchTxt(text);
        }
    };



    return(
        <ScrollView>
            <View style = { styles.container }>
                <View style = { styles.greetingsView }>
                        <Text 
                            style={{ ...styles.txtLarge }}>
                        Hi, Christina</Text>
                    <Image style={ styles.greetingsImg } source={bellIcon}/>
                </View>

                <View style={{height: hp(1)}}></View>

                <Text style={ styles.txtMedium }>What do you want to learn today?</Text>

                <View style={{height: hp(2)}}></View>

                {/* Search Box to search events */}
                <View style={{ paddingTop: wp(3) }}>
                    <TextInput
                        placeholder={"Search"}
                        placeholderTextColor={'grey'}
                        style={ styles.searchBox }
                        maxLength={50}
                        autoCorrect={false}
                        value={searchTxt}
                        clearButtonMode="always"
                        onChangeText={text => searchFilterFunction(text)}
                    />
                </View>

                <View style={{height: hp(2)}}></View>

                {/* Display Recent learnings */}

                <Text style={{ ...styles.txtTitle, marginBottom: hp(1)}}>Recent Learning</Text>
                
                {/* Create a horizontal ScrollView */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{ flexDirection: 'row'}}>
                    {/* Map through the list of events and render data using "CourseDisplay" component */}
                    { 
                        filteredRecentCourses.length > 0 ? (
                        filteredRecentCourses.map((item) => {
                            return(
                                <View key={item.name} style={{ marginRight: wp(4)}}>
                                    <CourseDisplay 
                                        courseType = "recent" 
                                        courseData = {item} />
                                </View>
                            )
                        })) : (
                            <View style={{ height: hp(3), width: wp(80)}}>
                            <Text style={{fontSize: 20, color:'#000'}}>No results found</Text>
                            </View>
                        )
                    }
                </ScrollView>

                <View style={{height: hp(5)}}></View>

        {/* Display the section "Course Slider" */}
                <View style={styles.tabbarMainView}>
                <TouchableOpacity
                    onPress={() => { setTabbar(true)}}
                    style={styles.tabView }
                >
                    <View style={styles.tabMainView}>
                        <Text
                            style={[styles.tabTextView,
                            {
                                color: tabbar ? "#000": 'gray',
                                fontWeight: tabbar ? 'bold' : 'normal'
                            },]}>Recommended</Text>
                        {tabbar? <View style={{ height: hp(0.4), width: wp(30), backgroundColor: '#51C3FE', marginTop: hp(2)}}></View>: null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setTabbar(false); }}
                    style={[styles.tabView]}>
                    <View style={styles.tabMainView}>
                        <Text
                            style={[styles.tabTextView,
                            {
                                color: !tabbar ? "#000" : 'gray',
                                fontWeight: !tabbar ? 'bold' : 'normal'
                            },]}>Algebra</Text>
                        {tabbar? null : <View style={{ height: hp(0.4), width: wp(30), backgroundColor: '#51C3FE', marginTop: hp(2)}}></View>}                                  
                    </View>
                </TouchableOpacity>
                </View>
                {
                    tabbar ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{ flexDirection: 'row'}}>
                        {/* Map through the list of events and render data using "CourseDisplay" component */}
                        { filteredRecommCourses.map((item) => {
                            return(
                                <View key={item.name} style={{ marginRight: wp(6)}}>
                                    <CourseDisplay 
                                        courseType = "recommended" 
                                        courseData = {item} />
                                </View>
                            )
                        })}
                    </ScrollView>
                    ):(
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{ flexDirection: 'row'}}>
                        {/* Map through the list of events and render data using "CourseDisplay" component */}
                        { filteredAlgebraCourses.map((item) => {
                            return(
                                <View key={item.name} style={{ marginRight: wp(6)}}>
                                    <CourseDisplay 
                                        courseType = "recommended" 
                                        courseData = {item} />
                                </View>
                            )
                        })}
                    </ScrollView>
                    )
                }

                {/* </View> */}

                <View style={{height: hp(5)}}></View>
                                
                {/* Display the section "Latest News" */}

                <View style={{ flexDirection: 'row', justifyContent:'space-between', width: wp(92), marginBottom: hp(1)}}>
                    <Text style={{ ...styles.txtTitle , marginBottom: hp(1)}}>Latest News</Text>
                    <Text style={{ ...styles.txtSmall , marginBottom: hp(1)}}>See All</Text>
                </View>
                
                {/* Map through the list of latestNews and render data using "CourseDisplay" component */}
                {
                    latestNews.map((item) => {
                        return(
                            <View key={item.name} style={{ marginBottom: hp(3)}}>
                                <CourseDisplay 
                                    courseType = "news"
                                    courseData = {item} />
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default EventsScreen;

const styles = StyleSheet.create( {
    container : {
        flex: 1 ,
        // backgroundColor: '#FFF', 
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp(3), 
        paddingVertical: hp(5)
    },
    greetingsView : {
        flexDirection:'row', 
        justifyContent:'space-between', 
        height: hp(7), 
        width: wp(92)
    },
    greetingsImg : {
        height: hp(4), 
        width: wp(6), 
        margin: hp(1)
    },
    searchBox : {
        width: "100%",
        height: hp(6),
        alignSelf: "center",
        borderRadius: 5,
        borderWidth:1,
        borderColor:'lightgrey',
        backgroundColor: "#E0E0E0",
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txtTitle:{
        fontSize: 20,
        color: "#000"
    },
    txtLarge : {
        color: '#000', 
        fontSize: 24, 
    },
    txtMedium : {
        color: '#000', 
        fontSize: 14 ,
    },
    txtSmall : {
        color: '#fff', 
        fontSize: 18 ,
        color: 'grey'
    },
    tabView: {
        height: hp(8),
        width: wp(40),
      },
      tabMainView: { 
        justifyContent: "center", 
        alignSelf: "center", 
        marginTop: hp(-4)
      },
      tabTextView: {
        alignSelf: "center",
        fontSize: 20,
        color: "#51C3FE",
      },
      tabbarMainView: {
        backgroundColor: "#F8F8F8",
        height: hp(4),
        width: wp(100),
        marginTop: hp(6),
        flexDirection: "row",
      },
})
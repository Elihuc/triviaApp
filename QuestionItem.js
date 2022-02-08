import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const QuestionItem = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.questTitle}>{props.questionItem.title}</Text>
            {
                props.questionItem.answers.map((answer,index) => (
                    <TouchableOpacity style={styles.btn} key={index} onPress={() => {
                        props.onNextQuestion(props.questionItem.id);
                        props.onAnswer(answer);
                    }}>
                        <Text style={styles.btn_text}>{answer.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )

}

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        backgroundColor:'#ffffff',
        padding:15,
        borderRadius:12,
        marginBottom:12,
        shadowColor: '#000000',
        shadowOpacity:0.1,
        shadowOffset: {width:0, height:3},
        shadowRadius: 2, elevation:5
    },
    btn_text: {fontSize:22},
    questTitle: {fontSize:28, marginBottom:40},
    container: {
        flex:1, width:'100%',
        alignItems:'flex-start', justifyContent:'center'
    },
});

export default QuestionItem;
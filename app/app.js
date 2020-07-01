var restBaseUrl = "http://localhost:8080/";
var app = angular.module('myApp', ['ngRoute']);

app.controller('MainController', ['$scope', '$rootScope', 'ChatService', function ($scope, $rootScope, ChatService) {
    ChatService.getAllQuestions(function (result) {
        $scope.allQuestions = result;
    });

    $scope.currentQuestionIndex = 0;

    $scope.answerQuestion = function (question) {
        question.answered = true;
        $scope.currentQuestionIndex++;
        console.log(question);
    }
    
    $scope.submitAnswers = function () {
        ChatService.newAnswerProfile({chatQuestions: $scope.allQuestions}, function (result) {
            alert("Thank you !");
        });
    }
}]);

app.factory('ChatFactory', ['$http', function ($http) {
    var chatFactory = {};

    chatFactory.getAllQuestions = function () {
        return $http({method: 'GET', url: restBaseUrl+'getAllQuestions'});
    }

    chatFactory.newAnswerProfile = function (answerProfile) {
        return $http({method: 'POST', url: restBaseUrl+'newAnswerProfile', data: answerProfile});
    }

    return chatFactory;
}]);

app.service('ChatService', ['ChatFactory', function (ChatFactory) {
    this.getAllQuestions = function (callback) {
        ChatFactory.getAllQuestions()
            .then(function (response) {
                console.log(response.data);
                callback(response.data);
            }, function (error) {
                callback(error);
            });
    }

    this.newAnswerProfile = function (answerProfile, callback) {
        ChatFactory.newAnswerProfile(answerProfile)
            .then(function (response) {
                console.log(response.data);
                callback(response.data);
            }, function (error) {
                callback(error);
            });
    }
}]);

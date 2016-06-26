Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '../../../../../../../public/tmp/',
    uploadDir: process.env.PWD + '../../../../../../../public',
    checkCreateDirectories: true,
    imageVersions: {
      large: {width: 600, height: 450, format: 'jpg'}, 
      medium: {width: 400, height: 300, format: 'jpg'},
      small: {width: 200, height: 100, format: 'jpg'}
    },
    getDirectory: function(file, formData) {
      return formData.contentType;
    },
    finished: function(file, folder, formFields) {
      console.log('Write to database: ' + folder + '/' + file);
    }
  })
});

Meteor.methods({
  throwPath: function(){
    throw new Meteor.Error(401, "process:"+ process.env.PWD);
  }
});
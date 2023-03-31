//const formidable = require('formidable');
const glob = require("glob");
const fs = require("fs-extra");
const path = require('path');
const ds = path.sep;

module.exports = {

    /**
     * This function returns the base path of this js file
     * Returns - E:\Projects\BH\outcry\
     */
    getBasePath: function() {
        var str = __dirname;
        var n = str.lastIndexOf('\\');
        var path = str.substring(0, n+1);
        return path;
    },





    /**
     * Create folder
     */
    createDirectory: function(folder_path) {
        if (!fs.existsSync(folder_path)){
            fs.mkdirSync(folder_path, { recursive: true });              
        }
    },





    /**
     *  Upload image(s) into the public/contents/events/{id}/ directory
     */
    uploadEventImages: async function(files, event_id) {
        var file_names = [];
        base_path = this.getBasePath() + 'public' + ds + 'contents' + ds + "events" + ds + event_id + ds;
        this.createDirectory(base_path);

        var max_upload = 3; //Max 3 images of an event can be uploaded

        for(key in files) {
            var file_array = files[key];
            var count = 0;
            for(var i=0; i<file_array.length; i++) {
                if(count < max_upload) {
                    if(file_array[i].originalFilename != '') {
                        var file_ext  = file_array[i].originalFilename.split('.').pop();
                        var file_name = (key != 'thumbnail' ? file_array[i].originalFilename : "thumbnail."+file_ext);
                        var temp_path = file_array[i].path;
                        var target_path = base_path + file_name;
        
                        if(file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png') {
                            await fs.copy(temp_path, target_path);
                            file_names.push(file_name);
                            count = count + 1;
                        }
                    } 
                } else {
                    break;
                }
            }
        }

        return file_names;
    },








    /**
     *  Upload file to the folder location specified from the controller
     *  Upload any single file from any location to specified location
     *  @param {*} files -- Files object from mulitparty
     *  @param {*} location -- Location of the file to be uploaded 
     *  @param {*} rename -- if set to false then file will be store with the original name
     *  @param {*} file_name -- if file_name is not empty then uploaded file name will be the value from file_name
     */
    uploadSingleFile: async function(files, location, rename = true, file_name = '') {
        var file_names = [];
        base_path = this.getBasePath() + location;
        this.createDirectory(base_path);
        for(key in files) {
            var file_array = files[key];
            var count = 0;
            for(var i=0; i<file_array.length; i++) {
                if(file_array[i].originalFilename != '') {
                    var file_name_arr = file_array[i].originalFilename.split('.');
                    var file_ext  = file_name_arr[1];
                    if(file_name == '') {
                        if(rename) {
                            //Prepend a random number of each file for uniqueness
                            var random_number = Math.floor(Math.random() * 1000000000);
                            file_name = random_number + "_" + file_name_arr[0]+ "." + file_ext;
                        } else {
                            file_name = file_name_arr[0]+ "." + file_ext;
                        }
                    } else {
                        file_name += "." + file_ext;
                    }
    
                    var temp_path = file_array[i].path;
                    var target_path = base_path + file_name;
                    //console.log(temp_path +" ------- " + target_path);
                    //if(file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png') {
                    await fs.copy(temp_path, target_path);
                    file_names.push(file_name);
                    count = count + 1;
                    //}
                }  
            }
        }

        return file_names;
    },








    /**
     *  Delete folder or file from any location
     *  First it will check that the location is a directoy or a file.
     *  Based on that it will perform the folder delete or file delete operation
     */
    removeDir: async function(path) {
        if (fs.statSync(path).isDirectory()) {
            if (fs.existsSync(path)) {
                const files = fs.readdirSync(path)
            
                if (files.length > 0) {
                    files.forEach(function(filename) {
                        if (fs.statSync(path + "/" + filename).isDirectory()) {
                            removeDir(path + "/" + filename)
                        } else {
                            fs.unlinkSync(path + "/" + filename)
                        }
                    })
                    fs.rmdirSync(path)
                } else {
                    fs.rmdirSync(path)
                }
            } else {
                console.log("Directory path not found.")
            }
        } else {
            fs.unlinkSync(path);
        }
    },






    /**
     * This function replaces all white spaces with a single hyphen
     * @param {*} str 
     * @param {*} is_lowercase by default true 
     */
    replaceSpaceWithHyphen: async function(str, is_lowercase = true) {
        //added '' before the string in case your str is undefinied or NaN 
        //str = '' + str.trim().replace(/ /g, "-");
        str = str
                .replace(/[^A-Za-z0-9 -]/g, "") // remove invalid chars
                .replace(/\s+/g, "-") // collapse whitespace and replace by -
                .replace(/-+/g, "-") // collapse dashes
                .replace(/^-+/, "") // trim - from start of text
                .replace(/-+$/, ""); // trim - from end of text

        if(is_lowercase) str = str.toLowerCase();
        return str;
    },








    /***** Beyond this line codes or functions are not required and will be removed soon *****/






















    /**
     * This method checks if a file is exists or not in the specifies directory
     * Returns true if found else returns false
     * @param {*} filename 
     */
    // isFileExists: function(filename) {
    //     const directoryPath = this.getBasePath() + "public" + ds + "user_contents" + ds + filename;
    //     if(fs.existsSync(directoryPath)) return true;
    //     else return false;
    // },

    isFileExists: function(filename) {
        const directoryPath = this.getBasePath() + "public" + ds + filename;
        if(fs.existsSync(directoryPath)) return true;
        else return false;
    },



    /**
     * This method checks if a file is exists or not in the specifies directory
     * Returns true if found else returns false
     * @param {*} filename 
     */
    isFileExistsWithCompletePath: function(filename) {
        //const directoryPath = this.getBasePath() + "public" + ds + "user_contents" + ds + filename;
        if(fs.existsSync(filename)) return true;
        else return false;
    },


    getPackageFile :function(vendor_id){
        const directoryPath =this.getBasePath() + "public" + ds + "user_contents" + ds + "vendor" + ds + vendor_id + ds + "offering" + ds + "package";  
                                    
        fs.readdir(directoryPath, function (err, files) {                                
            if (err) {
            return console.log('Unable to scan directory: ' + err);
            }                                 
            files.forEach(function (file) {                                   
                return(file); 
            });
        }); 
    },
  







    uploadFile: async function(temp_path, target_path) {

        var str = __dirname;
        var n = str.lastIndexOf('\\');
        var path = str.substring(0, n+1);

        var new_location = path + 'public' + ds + 'user_contents' + ds + target_path;
    
        // fs.copy(temp_path, new_location, function(err) {  
        //     if (err) {
        //         return "no";
        //     } else {
        //         //console.log("success!")
        //         return "yes";
        //     }
        // });

        

        var result = await new Promise((resolve, reject) => {
            fs.copy(temp_path, new_location, function(err, res) {  
                //return void err ? reject(err) : resolve("yes")
                if(!err){
                    resolve("yes");
                } else {
                    reject("NO");
                }
            });
        });

        return result;
    },
    
   /**category and sub category logo and thumbnails upload in file start */

    subcategoryuploadFile: async function(temp_path, target_path) {

        var str = __dirname;
        var n = str.lastIndexOf('\\');
        var path = str.substring(0, n+1);

        var new_location = path + 'public' + ds + target_path;
        console.log(new_location);
        var result = await new Promise((resolve, reject) => {
            fs.copy(temp_path, new_location, function(err, res) {  
                //return void err ? reject(err) : resolve("yes")
                if(!err){
                    resolve("yes");
                } else {
                    reject("NO");
                }
            });
        });
        return result;
    },

    /**category and  sub category logo and thumbnails upload in file ends */


  




    /**
     *  Upload file(s) into the public/user_contents directory
     *  Params: 
     *  files - files object, generated from multiparty() while form.parse() called
     *  target_folder - Exact location of the file within the user_contents directory
     */
    uploadFiles: function(files, target_folder) {

        var str = __dirname;
        var n = str.lastIndexOf('\\');
        var path = str.substring(0, n+1);

        base_path = path + 'public' + ds + 'user_contents' + ds;

        for(key in files) {
            var file = files[key];
            if(file[0].originalFilename != '') {
                var file_name = file[0].fieldName;
                var file_ext  = file[0].originalFilename.split('.').pop();
                var temp_path = file[0].path;
                var target_path = base_path + target_folder + file_name + '.' + file_ext;

                fs.copy(temp_path, target_path);
            }    
        }

        // var str = __dirname;
        // var n = str.lastIndexOf('\\');
        // var path = str.substring(0, n+1);

        // var new_location = path + 'public' + ds + 'user_contents' + ds + target_path;
    
       
        // var result = await new Promise((resolve, reject) => {
        //     fs.copy(temp_path, new_location, function(err, res) {  
        //         //return void err ? reject(err) : resolve("yes")
        //         if(!err){
        //             resolve("yes");
        //         } else {
        //             reject("NO");
        //         }
        //     });
        // });

        // return result;
    },

    
    /**
     *  Upload file(s) into the public/user_contents directory
     *  Params: 
     *  files - files object, generated from multiparty() while form.parse() called
     *  target_folder - Exact location of the file within the user_contents directory
     */
    uploadBlogFiles: function(files, target_folder) {

        var str = __dirname;
        var n = str.lastIndexOf('\\');
        var path = str.substring(0, n+1);

        base_path = path + 'public' + ds + 'blog' + ds;

        for(key in files) {
            var file = files[key];
            if(file[0].originalFilename != '') {
                var file_name = file[0].fieldName;
                var file_ext  = file[0].originalFilename.split('.').pop();
                var temp_path = file[0].path;
                var target_path = base_path + target_folder + file_name + '.' + file_ext;

                fs.copy(temp_path, target_path);
            }    
        }
    },















    /**
     * This function returns the list of files from the gallery folder
     * @param {id of the vendor or customer} vendor_id 
     * @param {file_type should be either "image" or "video"} file_type 
     */
    getGalleryFileList: function(vendor_id, file_type) {
        const directoryPath = this.getBasePath() + "public" + ds + "user_contents" + ds + "vendor" + ds + vendor_id + ds + "gallery" + ds;
        var object = [];
        var file_ext = (file_type == "image" ? '*.jpg' : (file_type == "video" ? '*.mp4' : ''));
        if(file_type != '') {
            glob.sync(file_ext, {cwd: directoryPath}).forEach(function(option) {
                object.push({"name" : option});
            });
            return object;
        } else {
            return null;
        }
    },


    /**
     * This function returns the list of files from the gallery folder
     * @param {id of the vendor or customer} vendor_id 
     * @param {file_type should be either "image" or "video"} file_type 
     */
    getOfferingFileList: function(vendor_id, folder) {
        const directoryPath = this.getBasePath() + "public" + ds + "user_contents" + ds + "vendor" + ds + vendor_id + ds + "offering" + ds + folder + ds;
        var object = [];
        glob.sync("**/*.*", {cwd: directoryPath}).forEach(function(option) {
            object.push(option);
        });
        return object;
    },








    /**
     * This function returns the list of files from the gallery folder
     * @param {id of the vendor or customer} vendor_id 
     * @param {file_type should be either "image" or "video"} file_type 
     */
    getAlbumFileList: function(vendor_id, folder_name, file_type) {
        const directoryPath = this.getBasePath() + "public" + ds + "user_contents" + ds + "vendor" + ds + vendor_id + ds + "gallery" + ds + folder_name + ds;
        var object = [];
        var file_ext = (file_type == "image" ? '*.jpg' : (file_type == "video" ? '*.mp4' : ''));
        if(file_type != '') {
            glob.sync(file_ext, {cwd: directoryPath}).forEach(function(option) {
                object.push({"name" : option});
            });
            return object;
        } else {
            return null;
        }
    },



 


    /**
     * This function returns rendom offer code for sharing,
     * inviting app
     */
    randomRefferalCode: function() {
        var length = 5;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },
    


    /**
     * Remove any non-empty directory
     * @param {*} path 
     */
    /* removeDir:function(path) {
        if (fs.existsSync(path)) {
          const files = fs.readdirSync(path)
       
          if (files.length > 0) {
            files.forEach(function(filename) {
              if (fs.statSync(path + "/" + filename).isDirectory()) {
                removeDir(path + "/" + filename)
              } else {
                fs.unlinkSync(path + "/" + filename)
              }
            })
            fs.rmdirSync(path)
          } else {
            fs.rmdirSync(path)
          }
        } else {
          console.log("Directory path not found.")
        }
    } */

};
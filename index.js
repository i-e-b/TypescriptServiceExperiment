var fs = require('fs');
var tss = require('typescript/bin/svcs');
var svc = tss.Services.TypeScriptServicesFactory;


var hostStub = {
    getCompilationSettings:function(){return "{}";},
    log:function(string){},

    /** Returns a JSON-encoded value of the type: string[] */
    getScriptFileNames:function(){return JSON.stringify(['sample.ts']);},
    getScriptVersion:function(fileName){},
    getScriptIsOpen:function(fileName){},
    getScriptSnapshot:function(fileName){
        var sampleText = fs.readFileSync(fileName, {encoding:'utf8'});
        return tss.ScriptSnapshot.fromString(sampleText);
    },
    getLocalizedDiagnosticMessages:function(){},
    getCancellationToken:function(){},
    getCurrentDirectory:function(){},
    getDefaultLibFilename:function(){
        console.log("CALLED!");return "";},
};

var res = new svc();

var lss = res.createLanguageServiceShim(hostStub);
//console.dir(lss);

var def = lss.languageService.getDefinitionAtPosition('sample.ts', 337);
console.dir(def);
//var srcFile = /*res*/lss.factory/* */.documentRegistry.acquireDocument(
//        "./sample.ts",  // filename
//        {},             // compilation settings
//        codesnap,       // scriptSnapshot
//        1.1,            // version
//        false);         // isOpen
//console.dir(srcFile);


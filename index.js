var fs = require('fs');
var tss = require('typescript/bin/svcs');
var svc = tss.Services.TypeScriptServicesFactory;


var hostStub = {
    getCompilationSettings:function(){return "{}";},
    log:function(string){console.log(string);},

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
    getDefaultLibFilename:function(){},
};

var res = new svc();

var lss = res.createLanguageServiceShim(hostStub);
console.dir(lss); // what you can call
console.log('--------------------------------');

var lang = lss.languageService;

console.dir(lang.getTypeAtPosition('sample.ts', 511)); // what type
//console.dir(lang.getDefinitionAtPosition('sample.ts', 511)); // where def?

// note: calling either of the above works ok, but calling both causes a fail.

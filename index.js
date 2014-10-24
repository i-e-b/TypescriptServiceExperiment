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

// List callable stuff
console.dir((new svc()).createLanguageServiceShim(hostStub));
console.log('--------------------------------');

function lang() {
    var lss = (new svc()).createLanguageServiceShim(hostStub);

    return lss.languageService;
}

console.time('sense');
console.dir(lang().getTypeAtPosition('sample.ts', 511)); // what type
console.dir(lang().getDefinitionAtPosition('sample.ts', 511)); // where def?
//console.dir(lang().getCompletionsAtPosition('sample.ts', 517)); // omnicomplete -- not working
console.timeEnd('sense');


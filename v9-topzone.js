/***
 *      @author Victor Chimenti, MSCS
 *      @file v9-topzone.js
 *      @see Seattle University School Image Panel Content Type for Top Zone
 *      v9/topzone
 *
 *      Document will write once when the page loads
 *
 *      @version 2.0
 */




/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.publish.utils.BrokerUtils)




/***
 *      Extract content values from T4 element tags
 */
function getContentValues (tag) {
  try {
    return {
      isError: false,
      content: BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
    }
  } catch (error) {
    return {
      isError: true,
      message: error.message
    }
  }
}




/***
 *      Write the document
 */
function writeDocument(array) {
    for(var i = 0; i < array.length; i++) {
        document.write(array[i])
    }
}




/***
 *      Insert code
 */
// function appendToTag(htmlTag, type, html, id) {

//     var newScript = "var element = document.createElement('"+type+"');element.innerHTML = '"+html+"';element.id = '"+id+"';if(!document.getElementById(element.id)){document.getElementsByTagName('"+htmlTag+"')[0].append(element);};"
//     var scriptTag = "<script id='tempScript'>"+newScript+"var tempScript = document.getElementById('tempScript'); tempScript.parentNode.removeChild(tempScript)</script>"
//     document.write(scriptTag)

// }




/***
 *      Process content
 */
try {


  /***
     *      Dictionary of content
     */
    var dict = {
        linkContent: getContentValues('<t4 type="content" name="Image Link" output="linkurl" modifiers="nav_sections"/>'),
        spotlightImage: getContentValues("<t4 type='content' name='Spotlight Image' output='imageurl' />"),
        spotlightImageAlt: getContentValues("<t4 type='content' name='Source' output='normal' modifiers='striptags,htmlentities' />"),
        titleContent: getContentValues('<t4 type="content" name="Text Title" output="normal" modifiers="striptags,htmlentities" />'),
        textContent: getContentValues('<t4 type="content" name="Text" output="normal" modifiers="striptags,htmlentities" />'),
        bioLinkContent: getContentValues('<t4 type="content" name="Bio Link" output="linkurl" modifiers="nav_sections" />'),
        sourceContent: getContentValues('<t4 type="content" name="Source" output="selective-output" modifiers="nav_sections" format=\'<span class="spotlightSource">$value</span>\' />'),
        affiliationContent: getContentValues('<t4 type="content" name="Affiliation" output="selective-output" modifiers="nav_sections" format=\'<span class="spotlightAffiliation">$value</span>\' />'),
        anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentIdTag: getContentValues('<t4 type="meta" meta="content_id" />')
    }


    /***
     *      Parse dictionary for errors
     */
    var errorString = ''
    var keys = Object.keys(dict)
    for (var i = 0; i < keys.length; i++) {
        if (dict[keys[i]].isError) {
        errorString += '' + keys[i] + ' - ' + dict[keys[i]].message + '\n'
        }
    }


    /***
     *      Handle errors
     */
    if (errorString) {

        document.write('Faild to get needed profile information from the following:\n')
        document.write('<pre>' + errorString + '</pre>')


    /***
     *      Format valid content
     */
    } else {

        var closeDiv = '</div>'
        var closeLink = '</a>'
        var mainWrapper = '<div class="contentItem spotlightWrapper standardContent g-0 w-50 d-flex flex-col flex-md-row" id="id' + dict.contentIdTag.content + '" data-position-default="Main" data-position-selected="Main">'
        var rowWrapper = '<div class="row w-100 mx-0">'
        var spotlightWrapper = '<div id="spotlightImg" class="spotlightImage col-xs-12 col-md-4">'
        var spotlightArrow = '<span class="spotlightArrow" aria-hidden="false"></span>'
        var spotlightLink = '<a class="spotlightImageFilter" href="' + dict.linkContent.content + '"/>'
        var spotlightImage = "<img src=" + dict.spotlightImage.content + " alt="+ dict.spotlightImageAlt.content + ">"
        var spotlightTextArea = '<div id="spotlightTextArea" class="spotlightCopy col-xs-12 col-md-7">'
        var header = '<h3>' + dict.titleContent.content +'</h3>'
        var spotlightBody = '<p class="spotlightCopyBody">' + dict.textContent.content + '</p>'
        var redBorder = '<div class="red-border-top visible-xs col-xs-1"></div>'
        var citationWrapper = '<div class="spotlightCopyCitation red-border-side mb-1">'
        var citationDiv = '<div class="spotlightCopyCitation">'
        var bioLinkTag = "<a class='spotlightBioLink' href='" + dict.bioLinkContent.content + "' />"
        var clearFix = '<div class="clearfix"></div>'
        // var extraStyle = '.standardContent img { padding: 0px !important; } .spotlightCopy p { font-size: 1rem !important; }'
        // appendToTag("head", "style", extraStyle, "spotlightExtraStyles")


        /***
         *      Write the document once
         */
        writeDocument(
            [	
                mainWrapper, 
                dict.anchorTag.content, 
                rowWrapper, 
                spotlightWrapper, 
                spotlightArrow, 
                spotlightLink, 
                spotlightImage, 
                closeLink,
                closeDiv,
                spotlightTextArea,
                header,
                spotlightBody,
                redBorder,
                citationWrapper,
                citationDiv,
                bioLinkTag,
                dict.sourceContent.content,
                dict.affiliationContent.content,
                closeLink,
                closeDiv,
                closeDiv,
                clearFix,
                closeDiv,
                closeDiv,
                closeDiv
        ])
    }




} catch (error) {
    document.write(error.message)
}
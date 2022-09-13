package com.example.home.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


/**
 * 첨부파일 업로드
 * @author sales
 *
 */
@Component
public class Upload {

    @Autowired
//    private UploadHelper up;

    public Upload() {
        // do nothing;
    }
//
//    public List<ImageModel> imageContentUpload(HttpServletRequest req, String fileFormNm, String uploadPath){
//
//        MultipartFile mf = null;
//        // multipart 일 경우..
//        if(req instanceof MultipartHttpServletRequest){
//            MultipartHttpServletRequest part = (MultipartHttpServletRequest) req;
//            mf = part.getFile(fileFormNm);
//        }
//
//        List<ImageModel> listImageModel = null;
//        if(null != mf && mf.getSize() > 0)
//            listImageModel = up.imageContentUpload(mf, uploadPath);
//
//        if(null == listImageModel || listImageModel.size() == 0) listImageModel = null;
//
//        return listImageModel;
//    }


}

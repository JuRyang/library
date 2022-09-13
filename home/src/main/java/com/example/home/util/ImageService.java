//package com.example.home.util;
//
//import com.daiwa.common.model.image.ImageModel;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.List;
//
//@Service
//public class ImageService {
//    /**
//     * 파일 업로드 객체
//     */
//    @Autowired
//    private Upload upload;
//
//    /**
//     * 이미지 저장 프로세스
//     */
//    public String doImageInsertProcess(HttpServletRequest req, HttpServletResponse res, String fileFormName, String uploadPath){
//
//        List<ImageModel> listImageFile = null;
//        try {
//            listImageFile = upload.imageContentUpload(req, fileFormName, uploadPath);
//
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//
//        try{
//            if(null != listImageFile && listImageFile.size() > 0){
//                // 수정하려는 이미지 등록
//                int idx = 0;
//                int parentImageNo = -1;
//                ImageModel imageFile = listImageFile.get(0);
//                return imageFile.getImageUrl();
//            }
//        }catch(Exception e){
//            if(null != listImageFile && listImageFile.size() > 0){
//                for (ImageModel ImageFile : listImageFile) ImageFile.delete();
//            }
//        }
//
//        return "";
//    }
//
//    public String doEditorImageInsertProcess(HttpServletRequest req, String fileFormName, String uploadPath){
//
//        List<ImageModel> listImageFile = null;
//        try {
//            listImageFile = upload.imageContentUpload(req, fileFormName, uploadPath);
//
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//
//        try{
//            if(null != listImageFile && listImageFile.size() > 0){
//                ImageModel imageFile = listImageFile.get(0);
//                return imageFile.getImageUrl();
//            }
//        }catch(Exception e){
//            if(null != listImageFile && listImageFile.size() > 0){
//                for (ImageModel ImageFile : listImageFile) ImageFile.delete();
//            }
//        }
//
//        return "";
//    }
//
//
//}

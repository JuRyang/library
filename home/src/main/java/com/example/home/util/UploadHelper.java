//package com.example.home.util;
//
//import com.daiwa.common.model.image.ImageModel;
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.imageio.ImageIO;
//import javax.swing.*;
//import java.awt.*;
//import java.io.File;
//import java.text.DateFormat;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.UUID;
//
///**
// * 파일 업로드 헬퍼
// * @author sales
// *
// */
//@Component
//public class UploadHelper {
//
//    private final Log log = LogFactory.getLog(UploadHelper.class);
//
//    // 현재 시간 (ms)
//    private long currentTime;
//
//    /**
//     * 생성자
//     */
//    public UploadHelper(){
//        currentTime = System.currentTimeMillis();
//    }
//
//    /**
//     * 이미지 저장
//     * @param mf
//     * @return
//     */
//    public List<ImageModel> imageContentUpload(MultipartFile mf, String uploadPath){
//
//        // 실제 저장 경로(월단위저장)
//        DateFormat df = new SimpleDateFormat("yyyyMM");
//        String yyyyMM = df.format(new Date());
//        String savePath = uploadPath + "/" + yyyyMM+"/";
//
//        List<ImageModel> listImageModel = new ArrayList();
//        UUID uuid = UUID.randomUUID();
//        String saveName = uuid.toString() + "_" + currentTime;
//        String realName = mf.getOriginalFilename();
//        String ext = realName.substring(realName.lastIndexOf("."));
//
//        String saveFile = savePath + saveName + ext;
//        ImageModel imageModel = null;
//
//
//        try{
//            imageModel = new ImageModel();
//
//            File file = new File(savePath);
//            if (file.exists() == false) {
//                file.mkdirs();
//            }
//
//            if (mf.isEmpty() == false) {
////                imageModel.setOriginName(realName);
////                imageModel.setContentNo(-1);
////                imageModel.setImageSize(mf.getSize());
//                imageModel.setImagePath(saveFile);
//                imageModel.setImageUrl(saveFile.replace(uploadPath, "/upload"));
////                imageModel.setImageType("origin");
//
//                Image srcImg = null;
//                String suffix = ext.toLowerCase();
//
//                if (suffix.equals("bmp") || suffix.equals("png") || suffix.equals("gif") || suffix.equals("jpg")) {
//                    srcImg = ImageIO.read(new File(saveFile));
//                } else {
//                    srcImg = new ImageIcon(saveFile.toString()).getImage();
//                }
//
//                if(null != srcImg){
//                    imageModel.setImageWidth(srcImg.getWidth(null));
//                    imageModel.setImageHeight(srcImg.getHeight(null));
//                }
//
//                file = new File(saveFile);
//                mf.transferTo(file);
//
//                listImageModel.add(imageModel);
//            }
//        }catch(Exception e){
//            log.error(">>> fileupload save error : " + realName, e);
//            imageModel = null;
//        }
//        return listImageModel;
//    }
//
//
//}

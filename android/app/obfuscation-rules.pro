# Keep package and class names
-keep class com.bakeably.** { *; }

# Keep specific class names
-keep class com.bakeably.MyClass { *; }

# Keep methods with specific annotations
-keepclassmembers class * {
    @com.bakeably.annotation.KeepMethod *;
}

# Keep fields with specific annotations
-keepclassmembers class * {
    @com.bakeably.annotation.KeepField *;
}

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep enum constants
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep entry points for code reflection
-keepclassmembers class * {
    public static void main(java.lang.String[]);
}
